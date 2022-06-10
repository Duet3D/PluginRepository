<template>
  <div>
    <h2>Releases</h2>
    <li v-for="item in items" :key="item.id">
      {{ item.message }}
    </li>
  </div>
</template>

<script>
// const {getReleases} = require('../api')
import axios from "axios"

const getReleases = async () => {
    const {data} = await axios.get('https://api.github.com/repos/Duet3D/DSF-Plugins/releases')
    const releases = data.map(x => {tag_name : x.tag_name})
    console.log(releases)
    return releases
}

export default {
  data() {
      return getReleases().then((res) => {return res})
    // return {
    //     items = []
    // //   items: [
    // //     { id: 1, message: "foo2" },
    // //     { id: 2, message: "Bar" },
    // //   ],
    // };
  },
  methods: {
      fetchReleases : () => {
          getReleases().then((res) => {this.items = res})
      }
  }
};
</script>
