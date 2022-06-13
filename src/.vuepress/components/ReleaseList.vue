<template>
  <div>
    <h2>Releases</h2>
    <li v-for="item in items" :key="item.id">
      {{ item.tag_name }}
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
  created(){
    window.axios.get('https://api.github.com/repos/Duet3D/DSF-Plugins/releases').then(data => {
      const items = data.data.map((x) => {
        return {tag_name : x.tag_name}
        })
      this.$data.items = items
    })
  }
};
</script>