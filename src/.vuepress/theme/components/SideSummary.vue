<template>
	<div>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Overview</h3>
                </div>
                <ul class="overview">
                  <li >{{"Latest version: "}}<a target="_self" :href="`${(this.$data.items.latest_release||{}).browser_download_url}`" class="bold">{{`${(this.$data.items.latest_release||{}).tag_name}`}}</a></li>
                  <li >{{"Release date: "}}<span class="bold">{{`${((this.$data.items.latest_release||{}).published_at||"").substring(0,10)}`}}</span></li>
                  <li >{{"First release date: "}}<span class="bold">{{`${((this.$data.items.latest_release||{}).first_release_date||"").substring(0,10)}`}}</span></li>
                  <li >{{"Release downloads: "}}<span class="bold">{{`${(this.$data.items.latest_release||{}).download_count_latest}`}}</span></li>
                  <li >{{"Total downloads: "}}<span class="bold">{{`${(this.$data.items.latest_release||{}).download_count_all_time}`}}</span></li>
                  <li >{{"Release count: "}}<span class="bold">{{`${(this.$data.items.latest_release||{}).release_count}`}}</span></li>
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
                        <a :href="`/search?q=tag:${keyword}`" class="keyword_list_1">{{keyword}}</a>
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
                <ul class="overview">
                  <li v-for="platform in getPlatforms" :key="platform.platform">{{`${platform.platform}: ${platform.version}`}}</li>
				</ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">License</h3>
                </div>
                <ul class="overview">
                  <li >
                    <a :href="`${this.$page.frontmatter.license_file}`" class="bold">{{`${this.$page.frontmatter.license}`}}</a>
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
                <ul class="overview">
                  <li ><a target="_self" :href="`${this.$page.frontmatter.homepage}`" class="bold">{{`${this.$page.frontmatter.homepage}`}}</a></li>
				</ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Source Code</h3>
                </div>
                <ul class="overview">
                  <li ><a target="_self" :href="`https://github.com/${this.$data.gituser}/${this.$data.gitrepo}/tree/${this.$data.gitbranch}/`" class="bold">{{`https://github.com/${this.$data.gituser}/${this.$data.gitrepo}/tree/${this.$data.gitbranch}/`}}</a></li>
				</ul>
                <br>
            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Author</h3>
                </div>
                <ul class="overview">
                  <li ><a target="_self" :href="`https://github.com/${this.$data.gituser}`" class="bold">{{`${this.$data.gituser}`}}</a></li>
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
		};
	},
	props: {

	},
	mounted() {
		this.$data.gituser = this.$page.frontmatter.author;
		this.$data.gitrepo = this.$page.frontmatter.repo;
		this.$data.gitbranch = this.$page.frontmatter.branch

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

				this.$data.items.latest_release = {browser_download_url, download_count_latest, tag_name, published_at, download_count_all_time, release_count, first_release_date}

				this.$forceUpdate();
			});
	},
	computed: {
		getPlatforms() {
			const platforms = []
			const predef = ['dwcVersion', 'sbcDSfVersion', 'rrfVersion']
			predef.forEach(platform => {
				if(this.$page.frontmatter[platform] && this.$page.frontmatter[platform] != 'undefined')
					platforms.push({
						platform,
						version: this.$page.frontmatter[platform]
					})
			})
			return platforms
		}
	}
};
</script>