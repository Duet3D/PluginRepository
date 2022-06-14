<template>
  <div>
    <h2>Releases</h2>
    <li v-for="item in items" :key="item.id">
      <a v-bind:href="item.zipball_url">{{ item.tag_name }}</a>
    </li>
  </div>
</template>

<script>
    if (typeof window !== "undefined"){
      window.global = window;
    }
    //Remove this once api.js is imported as a plugin

    window.axios = require('axios');
    //Not a good practice. Import api.js as a plugin

export default {
  data() {
    return {
      items: [],
    };
  },
  props: ['gituser', 'gitrepo'],
  created(){
    window.axios.get(`https://api.github.com/repos/${this.gituser}/${this.gitrepo}/releases`).then(data => {
      const items = data.data.map((x) => {
        return {tag_name : x.tag_name, zipball_url: x.zipball_url}
        })
      this.$data.items = items
    })
  }
};
</script>