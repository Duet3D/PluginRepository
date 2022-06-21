<template>
	<div>
        <br>
		<h2>Search Results</h2>

	</div>
</template>

<script>

import {Flexsearch} from "flexsearch";

export default {
  data () {
    return {
      index: null,
      query: ""
    };
  },
  // In Vuepress you should use mounted not Created life-cycle hook, otherwise it will throw an error.
  mounted () {
    this.index = new Flexsearch({
      tokenize: "forward",
      doc: {
        id: "key",
        // here you choose the fields you want to index.
        // for me I will search in the title and the content of each page.
        // of course I stripped the content before so I use the plain text content not the markdown text
        field: ["title", "content"]
      }
    });
    // Vuepress injects the $site global variable in the Vue instance, you can get the pages array from the $site object
    const { pages } = this.$site;
    // finally you add the pages to the FlexSearch index.
    this.index.add(pages);

    console.log(this)
  },
  methods: {
    querySearchAsync (queryString, cb) {
      const { pages, themeConfig } = this.$site;
      const query = queryString.trim().toLowerCase();
      const max = 10;

      if (this.index === null || query.length < 3) {
        return cb([]);
      }

      // here we use the search method that FlexSearch provides.
      this.index.search(
        query,
        {
          limit: max,
          threshold: 2,
          // for other types of encoding refer to https://github.com/nextapps-de/flexsearch#encoders
          encode: 'extra'
        },
        // this callback gives you the all pages that contains the search term "query"
        (result) => {
          if (result.length) {
            // getting the value and link of each page that contains the search term
            const resolvedResult = result.map(page => {
              return {
                link: page.path,
                value: this.getQuerySnippet(page)
              };
            });
            return cb(resolvedResult);
          } else {
            return cb([{ value: `No results! Try something else.`, link: `#` }]);
          }
        }
      );
    }
  }
};
</script>