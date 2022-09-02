<template>
	<div>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">📈 Stats</h3>
                </div>
                <p>{{`There are ${this.$data.plugin_count} plugins available`}}</p>
                <br>
            </div>
        </section>
	</div>
</template>

<script>
import fetch from 'cross-fetch';

export default {
	data() {
		return {
			items: {},
			plugin_count: 0
		};
	},
	props: {

	},
	mounted() {
		this.$data.gituser = this.$page.frontmatter.author;
		this.$data.gitrepo = this.$page.frontmatter.repo;
		this.$data.gitbranch = this.$page.frontmatter.branch

    fetch('/PluginRepository/assets/plugin_stats.json')
        .then(res => res.json())
        .then(data => {
			console.log(data)
          this.$data.plugin_count = (data || []).length;
        })
	},
	computed: {
		getPlatforms() {
			const platforms = []
			const predef = [{ key: 'dwcVersion', name: 'Duet Web Control', url: 'https://docs.duet3d.com/User_manual/Reference/Duet_Web_Control_Manual'}, { key: 'sbcDSfVersion',  name: 'Duet Software Framework', url: 'https://docs.duet3d.com/User_manual/Machine_configuration/SBC_setup'}, { key: 'rrfVersion',  name: 'RepRapFirmware', url: 'https://docs.duet3d.com/User_manual/RepRapFirmware/RepRapFirmware_overview'}]
			predef.forEach(({key, name, url}) => {
				if(this.$page.frontmatter[key] && this.$page.frontmatter[key] != 'undefined')
					platforms.push({
						platform: name,
						version: this.$page.frontmatter[key],
            url: url
					})
			})
			return platforms
		}
	}
};
</script>