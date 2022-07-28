<template>
	<div>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                  <h3 class="h3_class">Overview3</h3>
                </div>
                <ul class="overview">
                  <li :key="items">{{"Latest release: "}}<a target="_self" :href="`${(this.$data.items.latest_release||{}).browser_download_url}`" class="bold">{{`${(this.$data.items.latest_release||{}).tag_name}`}}</a></li>
                  <li :key="items">{{"Release date: "}}<span class="bold">{{`${((this.$data.items.latest_release||{}).published_at||"").substring(0,10)}`}}</span></li>
                  <li :key="items">{{"Release downloads: "}}<span class="bold">{{`${(this.$data.items.latest_release||{}).download_count_latest}`}}</span></li>
                  <li :key="items">{{"Total downloads: "}}<span class="bold">{{`${(this.$data.items.latest_release||{}).download_count_all_time}`}}</span></li>
                  <li :key="items">{{"Release count: "}}<span class="bold">{{`${(this.$data.items.latest_release||{}).release_count}`}}</span></li>
                </ul>
                <ul class="card_footer">
                    <li><span title="Downloads" class="card_footer_1">{{"⬇️ " + `${this.$page.frontmatter.download_count}`}}</span></li>
                    <li><a target="_self" :href="`${this.$page.frontmatter.release_page}`"><span title="Release" class="card_footer_1">{{"🔖 " + `${this.$page.frontmatter.latest_version}`}}</span></a></li>
                    <li><span title="Last Release Date" class="card_footer_1">{{"📅 " + `${this.$page.frontmatter.release_date.substring(0,10)}`}}</span></li>
                    <li><a target="_self" :href="`https://github.com/${this.$page.frontmatter.author}`"><span title="Author" class="card_footer_1">{{"👤 " + `${this.$page.frontmatter.author}`}}</span></a></li>
                </ul>
                <ul class="keyword_1">
                    <li v-for="keyword in this.$page.frontmatter.tags" :key="keyword">
                        <a :href="`/search?q=tag:${keyword}`" class="keyword_list_1">{{keyword}}</a>
                    </li>
                </ul>
                <br>    

                <div class="div_2">
                    <a target="_self" :href="`/PluginRepository${this.$page.frontmatter.path}`">
                        <h3 class="h3_class">Stats</h3>
                    </a>
                </div>
                <ul>
                  <li>abc</li>
                  <li>ass</li>
                  <li>dd</li>
                  <li>sss</li>
                </ul>

            </div>
        </section>
        <section class="card3">
            <div class="div_1">
                <div class="div_2">
                    <a target="_self" :href="`/PluginRepository${this.$page.frontmatter.path}`">
                        <h3 class="h3_class">{{this.$page.frontmatter.title}}</h3>
                    </a>
                    <span class="highlight_1" v-if="this.$page.frontmatter.oem">{{'Duet3D'}}</span>
                </div>
                <p class="description_1">{{this.$page.frontmatter.abstract}}</p>
                <ul class="card_footer">
                    <li><span title="Downloads" class="card_footer_1">{{"⬇️ " + `${this.$page.frontmatter.download_count}`}}</span></li>
                    <li><a target="_self" :href="`${this.$page.frontmatter.release_page}`"><span title="Release" class="card_footer_1">{{"🔖 " + `${this.$page.frontmatter.latest_version}`}}</span></a></li>
                    <li><span title="Last Release Date" class="card_footer_1">{{"📅 " + `${this.$page.frontmatter.release_date.substring(0,10)}`}}</span></li>
                    <li><a target="_self" :href="`https://github.com/${this.$page.frontmatter.author}`"><span title="Author" class="card_footer_1">{{"👤 " + `${this.$page.frontmatter.author}`}}</span></a></li>
                </ul>
                <ul class="keyword_1">
                    <li v-for="keyword in this.$page.frontmatter.tags" :key="keyword">
                        <a :href="`/search?q=tag:${keyword}`" class="keyword_list_1">{{keyword}}</a>
                    </li>
                </ul>
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
		gituser: String,
		gitrepo: String
	},
	mounted() {
		fetch(`https://api.github.com/repos/${this.gituser}/${this.gitrepo}/releases`)
			.then(res => res.json())
			.then(data => {

				const release_count = (data || []).length

				console.log(release_count)

				const download_count_all_time = data.reduce(
					(previousValue, item) => {
						return previousValue + ((item||{}).assets[0]||{}).download_count || 0
						},0);

				const item = data[0]
          		const {browser_download_url, download_count:download_count_latest} = item.assets[0]
				const {tag_name, published_at} = item || {}

				this.$data.items.latest_release = {browser_download_url, download_count_latest, tag_name, published_at, download_count_all_time, release_count}

				this.$forceUpdate();
			});
	}
};
</script>