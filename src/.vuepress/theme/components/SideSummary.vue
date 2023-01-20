<template>
	<div>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Overview</h3>
                </div>
                <ul class="overview" style="list-style-type: none">
                  <li >{{"🔖 Latest version: "}}<a target="_blank" :href="`${(this.$data.items.plugin_info||{}).browser_download_url}`" class="bold">{{`${(this.$data.items.plugin_info||{}).tag_name || "⏳"}`}}</a></li>
                  <li >{{"📅 Release date: "}}<span class="bold">{{`${((this.$data.items.plugin_info||{}).published_at||"").substring(0,10) || "⏳"}`}}</span></li>
                  <li >{{"📆 First release date: "}}<span class="bold">{{`${((this.$data.items.plugin_info||{}).first_release_date||"").substring(0,10) || "⏳"}`}}</span></li>
                  <li >{{"⬇️ Release downloads: "}}<span class="bold">{{`${(this.$data.items.plugin_info||{}).download_count_latest || "⏳"}`}}</span></li>
                  <li >{{"⏬ Total downloads: "}}<span class="bold">{{`${(this.$data.items.plugin_info||{}).download_count_all_time || "⏳"}`}}</span></li>
                  <li >{{"⏬ Weekly downloads: "}}<span class="bold">{{`${((this.$data.items.plugin_info||{}).download_count_all_time - this.$data.items.total_downloads_on_week_start) || 0}`}}</span></li>
                  <li >{{"📊 Release count: "}}<span class="bold">{{`${(this.$data.items.plugin_info||{}).release_count || "⏳"}`}}</span></li>
                </ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Downloads</h3>
                </div>
				<ReleaseList :gituser="`${this.$data.gituser}`" :gitrepo="`${this.$data.gitrepo}`"/>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Tags</h3>
                </div>
                <ul class="keyword_1">
                    <li v-for="keyword in this.$page.frontmatter.tags" :key="keyword">
                        <a target="_blank" :href="`https://plugins.duet3d.com/search/?keyword=${keyword}`" class="keyword_list_1">{{keyword}}</a>
                    </li>
                </ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Compatible Platforms</h3>
                </div>
                <ul class="overview" style="list-style-type: none">
                  <li v-for="platform in getPlatforms" :key="platform.platform"><a target="_blank" :href="platform.url">{{`🛂 ${platform.platform}`}}</a></li>
				        </ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">License</h3>
                </div>
                <ul class="overview" style="list-style-type: none">
                  <li >
                    <a target="_blank" :href="`${this.$page.frontmatter.license_file}`" class="bold">{{`🧾 ${this.$page.frontmatter.license}`}}</a>
                  </li>
				        </ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Homepage</h3>
                </div>
                <ul class="overview" style="list-style-type: none">
                  <li ><a target="_blank" :href="`${this.$page.frontmatter.homepage}`" class="bold">{{`🏠 ${this.$page.frontmatter.homepage}`}}</a></li>
				        </ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Source Code</h3>
                </div>
                <ul class="overview" style="list-style-type: none">
                  <li ><a target="_blank" :href="`https://github.com/${this.$data.gituser}/${this.$data.gitrepo}/tree/${this.$data.gitbranch}/`" class="bold">{{`📝 GitHub`}}</a></li>
				        </ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Author</h3>
                </div>
                <ul class="overview" style="list-style-type: none">
                  <li ><a target="_blank" :href="`https://github.com/${this.$data.gituser}`" class="bold">{{`👤 ${this.$data.gituser}`}}</a></li>
				        </ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">See a problem?</h3>
                </div>
                <ul class="overview">
                  <a target="_blank" :href="`https://github.com/Duet3D/PluginRepository/issues/new?assignees=yasasw&labels=abuse-report&template=PluginReport.yml&title=%5BPluginReport%5D%3A+${this.$data.gitrepo}&PluginID=${this.$data.gitrepo}`" class="red">❗Report Abuse</a>
				        </ul>
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
      total_downloads_on_week_start: 0
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
          
          const {total_downloads_on_week_start} = (data||[]).find( x=> x.plugin_id == this.$page.frontmatter.repo);

        this.$data.items.total_downloads_on_week_start = total_downloads_on_week_start || 0;
      });

		fetch(`https://api.github.com/repos/${this.$data.gituser}/${this.$data.gitrepo}/releases`)
			.then(res => res.json())
			.then(data => {

				const release_count = (data || []).length
				const download_count_all_time = data.reduce(
					(previousValue, item) => {
						return previousValue + ((item||{}).assets[0]||{}).download_count || 0
						},0);
				const {published_at: first_release_date} = (data||[])[release_count-1] || {}

				const item = data[0]
          		const {browser_download_url, download_count:download_count_latest} = item.assets[0]
				const {tag_name, published_at} = item || {}

				this.$data.items.plugin_info = {browser_download_url, download_count_latest, tag_name, published_at, download_count_all_time, release_count, first_release_date}
				this.$forceUpdate();
			});
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