<template>
	<div class="div_2">
		<ul class="overview" style="list-style-type: none">
			<li v-for="item in items" :key="item.tagName">
				<a :href="item.browser_download_url">
					{{ "⬇️ " + item.tagName }}
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
import fetch from 'cross-fetch';

export default {
	data() {
		return {
			items: [],
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
				this.$data.items = data.map(item => {
          const {browser_download_url, download_count} = item.assets[0]
					return {
						tagName: item.tag_name,
						browser_download_url,
            download_count
					}
				})
			});
	}
};
</script>