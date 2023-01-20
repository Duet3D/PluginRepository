<template>
	<div class="div_2" :key="this.$data.downloadsVisible">
			<table class="sidebar_downloads">
				<tr>
					<th>⬇️ Version</th>
					<th>🔖 Platform(s)</th>
				</tr>
				<tr v-for="item in visibleDownloads" :key="item.tagName">
					<td><a :href="item.browser_download_url">{{ item.tagName }}</a></td>
					<td>

						<div><a target="_blank" :href="`${url_list[item.version_list[0].platform]}`">{{item.version_list[0].platform + ": " + item.version_list[0].version}}</a></div>
						<div v-if="item.version_list[1]"><a target="_blank" :href="`${url_list[item.version_list[1].platform]}`">{{item.version_list[1].platform + ": " + item.version_list[1].version}}</a></div>
						<div v-if="item.version_list[2]"><a target="_blank" :href="`${url_list[item.version_list[2].platform]}`">{{item.version_list[2].platform + ": " + item.version_list[2].version}}</a></div>
					</td>
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
			step : 5,
			url_list : 	{
				"DWC" : "https://docs.duet3d.com/User_manual/Reference/Duet_Web_Control_Manual",
				"DSF" : "https://docs.duet3d.com/User_manual/Machine_configuration/SBC_setup",
				"RRF" : "https://docs.duet3d.com/User_manual/RepRapFirmware/RepRapFirmware_overview"
			}
		};
	},
	props: {
		gituser: String,
		gitrepo: String
	},
	mounted() {
		fetch(`https://plugins.duet3d.com/assets/plugin_versions/${this.gitrepo}.json`)
			.then(res => res.json())
			.then(data => {
				let i = 0;
				this.$data.items = data.map(item => {
					  i++;
			          const {tagName, browser_download_url, version_list, download_count} = item;
					  return {
						tagName: tagName + `${i==1? " [Latest]":""}`,
						browser_download_url,
						version_list,
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