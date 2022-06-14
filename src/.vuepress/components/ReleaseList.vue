<template>
	<div>
		<h2>Releases</h2>
		<ul>
			<li v-for="item in items" :key="item.tagName">
				<a :href="item.zipballUrl">
					{{ item.tagName }}
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
					return {
						tagName: item.tag_name,
						zipballUrl: item.zipball_url
					}
				})
			});
	}
};
</script>