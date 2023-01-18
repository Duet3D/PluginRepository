<template>
	<div class="div_2" :key="this.$data.downloadsVisible">
			<table class="sidebar_downloads">
				<tr>
					<th>⬇️ Tag</th>
					<th>🔖 Platform</th>
				</tr>
				<tr v-for="item in visibleDownloads" :key="item.tagName">
					<td><a :href="item.browser_download_url">{{ item.tagName }}</a></td>
					<td>{{item.platform + "-" + item.version}}</td>
				</tr>
			</table>
		<button v-on:click="showMore" v-if="downloadsVisible < items.length">Load more...</button>
	</div>
</template>

<script>
import fetch from 'cross-fetch';

export default {
	data() {
		return {
			items: [],
			downloadsVisible: 5,
			step : 5
		};
	},
	props: {
		gituser: String,
		gitrepo: String
	},
	mounted() {
		// fetch(`https://api.github.com/repos/${this.gituser}/${this.gitrepo}/releases`)
		fetch(`https://plugins.duet3d.com/assets/plugin_versions/${this.gitrepo}.json`)
			.then(res => res.json())
			.then(data => {
				let i = 0;
				this.$data.items = data.map(item => {
					  i++;
			          const {tagName, browser_download_url, version, platform, download_count} = item;
					  return {
						tagName: tagName + `${i==1? " [Latest]":""}`,
						browser_download_url,
						version, 
						platform,
            			download_count : 0
					  }
				})
			});
	},
	methods: {
		showMore() {
			if(this.downloadsVisible < this.items.length)
				this.downloadsVisible = this.downloadsVisible + this.$data.step
		}
	},
	computed: {
		visibleDownloads() {
			return this.$data.items.slice(0, this.$data.downloadsVisible)
		}
	}
};
</script>