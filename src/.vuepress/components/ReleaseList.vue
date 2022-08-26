<template>
	<div class="div_2" :key="this.$data.downloadsVisible">
		<ul class="overview" style="list-style-type: none">
			<li v-for="item in visibleDownloads" :key="item.tagName">
				<a :href="item.browser_download_url">
					{{ "⬇️ " + item.tagName }}
				</a>
			</li>
		</ul>
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
		fetch(`https://api.github.com/repos/${this.gituser}/${this.gitrepo}/releases`)
			.then(res => res.json())
			.then(data => {
				let i = 0;
				this.$data.items = data.map(item => {
					  i++;
			          const {browser_download_url, download_count} = item.assets[0]
					  return {
						tagName: item.tag_name + `${i==1? " [Latest]":""}`,
						browser_download_url,
            			download_count
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