<template>
	<div>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">📈 Stats</h3>
                </div>
                <ul class="overview" style="list-style-type: none">
                  <li >{{"Plugin Count: "}}<span class="bold">{{`${ this.$data.plugin_count|| "⏳"}`}}</span></li>
                  <li >{{"Total Downloads: "}}<span class="bold">{{`${ this.$data.total_downloads || "⏳"}`}}</span></li>
                  <li >{{"Weekly Downloads: "}}<span class="bold">{{`${ this.$data.weekly_downloads || "⏳"}`}}</span></li>
                </ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Recently Added</h3>
                </div>
                <ul class="overview" style="list-style-type: none">
                    <li v-for="plugin in this.$data.newly_added_plugins" :key="plugin.plugin_id">
                        <a target="_blank" :href="`/plugins/${plugin.plugin_id}.html`">{{plugin.plugin_id}}</a>
                    </li>
                </ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Most Downloaded</h3>
                </div>
                <ul class="overview" style="list-style-type: none">
                    <li v-for="plugin in this.$data.most_download_plugins" :key="plugin.plugin_id">
                        <a target="_blank" :href="`/plugins/${plugin.plugin_id}.html`">{{`${plugin.plugin_id} (${plugin.total_download_count} downloads)`}}</a>
                    </li>
                </ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">This Week's Trending</h3>
                </div>
                <ul class="overview" style="list-style-type: none">
                    <li v-for="plugin in this.$data.weekly_trending_plugins" :key="plugin.plugin_id">
                        <a target="_blank" :href="`/plugins/${plugin.plugin_id}.html`">{{`${plugin.plugin_id}`}}</a>
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

function compareByDownloaded( a, b ) {
    let type = 'total_download_count'
    if ( a[`${type}`] < b[`${type}`] ){
        return 1;
    }
    if ( a[`${type}`] > b[`${type}`] ){
        return -1;
    }
    return 0;
}
function compareByWeeklyTrending( a, b ) {
    let type = 'ongoing_total_weeky_downloads'
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
			most_download_plugins: [],
            weekly_trending_plugins: [],
			plugin_count: 0,
            total_downloads: 0,
            weekly_downloads: 0
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

		  let data_copy = data.slice();
		  this.$data.newly_added_plugins = data_copy.sort(compareBySubmittedOn).slice(0, 5).map(x=>{return {plugin_id: x.plugin_id, plugin_submitted_on: x.plugin_submitted_on}});


		  data_copy = data.slice();
		  this.$data.most_download_plugins = data_copy.sort(compareByDownloaded).slice(0, 5).map(x=>{return {plugin_id: x.plugin_id, total_download_count: x.total_download_count}});

		  data_copy = data.slice();
		  this.$data.weekly_trending_plugins = data_copy.sort(compareByWeeklyTrending).slice(0, 5).map(x=>{return {plugin_id: x.plugin_id, total_download_count: x.ongoing_total_weeky_downloads}});

          let total_downloads_on_week_start = 0;
          let total_downloads = 0;
          (data||[]).forEach( x=> {
              total_downloads += x.total_download_count;
              total_downloads_on_week_start += x.total_downloads_on_week_start;
          })

          this.$data.total_downloads = total_downloads;
          this.$data.weekly_downloads = total_downloads - total_downloads_on_week_start;
        })
	},
	computed: {

	}
};
</script>