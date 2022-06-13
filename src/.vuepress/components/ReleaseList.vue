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

    window.axios = require('axios');


export default {
  data() {

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