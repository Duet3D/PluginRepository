<template>
	<div>
		<h2>All Plugins</h2>
        <div class="search_box_1">         
            <input type="text" v-model="input" placeholder="Search plugins..." />
        </div>

        <br>
            
        <section class="card2" v-for="item in filterPlugins" :key="item.key">
            <div class="div_1">
                <div class="div_2">
                    <a target="_self" :href="`/PluginRepository${item.path}`">
                        <h3 class="h3_class">{{item.title}}</h3>
                    </a>
                    <span class="highlight_1" v-if="item.frontmatter.oem">{{'Duet3D'}}</span>
                </div>
                <p class="description_1">{{item.frontmatter.abstract}}</p>
                <ul class="card_footer">
                    <li><span title="Published Date" class="card_footer_1">{{"📅 " + `${item.frontmatter.published_date}`}}</span></li>
                    <li><span title="Release" class="card_footer_1">{{"🔖 " + `${item.frontmatter.latest_version}`}}</span></li>
                    <li><span title="Last Release Date" class="card_footer_1">{{"📅 " + `${item.frontmatter.release_date}`}}</span></li>
                </ul>
                <ul class="keyword_1">
                    <li v-for="keyword in item.frontmatter.tags" :key="keyword">
                        <a :href="`/search?q=tag:${keyword}`" class="keyword_list_1">{{keyword}}</a>
                    </li>
                </ul>
            </div>
        </section>

	</div>
</template>

<script>

export default {
	data() {
		return {
            input: '',
			items: [],
		};
	},
	mounted() {
        this.$data.items = this.$site.pages.filter( x => x.regularPath.substring(0,9) === '/plugins/' && x.regularPath.length > 9)
	},
    computed: {
        filterPlugins() {
            return this.$data.items.filter(item => {
                const inp = this.input.toLowerCase()
                return item.title.toLowerCase().includes(inp) || item.frontmatter.tags.toString().toLowerCase().includes(inp)
            })
        }
    }
};
</script>