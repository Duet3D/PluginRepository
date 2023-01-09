<template>
	<div>
		<h6 style="text-align: center">{{"Duet3D Limited 2023 | Plugin Repository Version: " + this.$data.version}}</h6>
	</div>
</template>

<script>
import fetch from 'cross-fetch';

export default {
	data() {
		return {
			items: [],
            version: undefined
		};
	},
	props: {
		gituser: String,
		gitrepo: String
	},
	mounted() {
		fetch(`https://raw.githubusercontent.com/Duet3D/PluginRepository/master/package.json`)
			.then(res => res.json())
			.then(data => {
                const {version} = data;
                this.$data.version = version;
			});
	}
};
</script>
