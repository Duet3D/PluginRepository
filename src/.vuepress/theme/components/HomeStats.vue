<template>
	<div>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">📈 Stats</h3>
                </div>
                <p>{{`There are ${this.$data.plugin_count} plugins available`}}</p>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Newly Added</h3>
                </div>
                <ul>
                    <li v-for="plugin_id in this.$data.newly_added_plugins" :key="plugin_id">
                        <a target="_blank" :href="`/plugins/${plugin_id}.html`">{{plugin_id}}</a>
                    </li>
                </ul>
                <br>
            </div>
        </section>
	</div>
</template>

<script>

function compareBySubmittedOn( a, b ) {
    let type = 'plugin_submitted_on'
    if ( a[`${type}`] < b[`${type}`] ){
        return 1;
    }
    if ( a[`${type}`] > b[`${type}`] ){
        return -1;
    }
    return 0;
}

import fetch from 'cross-fetch';

export default {
	data() {
		return {
			items: {},
			newly_added_plugins: [],
			plugin_count: 0
		};
	},
	props: {

	},
	mounted() {
		this.$data.gituser = this.$page.frontmatter.author;
		this.$data.gitrepo = this.$page.frontmatter.repo;
		this.$data.gitbranch = this.$page.frontmatter.branch

    fetch('https://plugins.duet3d.com/assets/plugin_stats.json') // /assets/plugin_stats.json
        .then(res => res.json())
        .then(data => {
          this.$data.plugin_count = (data || []).length;

		  let new_plugins = data.slice();
		  new_plugins.sort(compareBySubmittedOn);
		  const x = new_plugins.sort(compareBySubmittedOn).slice(0, 5).map(x=>x.plugin_id)
		  console.log(x)
		  this.$data.newly_added_plugins = x;

        })
	},
	computed: {

	}
};
</script>