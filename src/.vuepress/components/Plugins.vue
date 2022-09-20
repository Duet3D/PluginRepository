<template>
	<div>
        <div class="search_box_1">         
            <div class="search_filter_btn">
            <input type="text" v-model="input" placeholder="Search plugins..." />
                <button v-on:click="showDWC">DWC</button>
                <button v-on:click="showSBC">SBC</button>
                <button v-on:click="showRRF">RRF</button>
            </div> 

        </div>


        <br>
            
        <section class="card2" v-for="item in filterPlugins" :key="item.key">
            <div class="div_1">
                <div class="div_2">
                    <a target="_self" :href="`${item.path}`">
                        <h3 class="h3_class">{{item.title}}</h3>
                    </a>
                    <span class="highlight_1" v-if="item.frontmatter.oem">{{'Duet3D'}}</span>
                </div>
                <p class="description_1">{{item.frontmatter.abstract}}</p>
                <ul class="card_footer">
                    <li><span title="Downloads" class="card_footer_1">{{"⬇️ " + `${item.frontmatter.download_count}`}}</span></li>
                    <li><a target="_self" :href="`${item.frontmatter.release_page}`"><span title="Release" class="card_footer_1">{{"🔖 " + `${item.frontmatter.latest_version}`}}</span></a></li>
                    <li><span title="Last Release Date" class="card_footer_1">{{"📅 " + `${item.frontmatter.release_date.substring(0,10)}`}}</span></li>
                    <li><a target="_self" :href="`https://github.com/${item.frontmatter.author}`"><span title="Author" class="card_footer_1">{{"👤 " + `${item.frontmatter.author}`}}</span></a></li>
                </ul>
                <ul class="keyword_1">
                    <li v-for="keyword in item.frontmatter.tags" :key="keyword">
                        <a :href="`https://plugins.duet3d.com/search/?keyword=${keyword}`" class="keyword_list_1">{{keyword}}</a>
                    </li>
                </ul>
            </div>
        </section>

	</div>
</template>

<script>

function compareFn( a, b ) {
    let type = 'release_date'
    if ( a.frontmatter[`${type}`] < b.frontmatter[`${type}`] ){
        return 1;
    }
    if ( a.frontmatter[`${type}`] > b.frontmatter[`${type}`] ){
        return -1;
    }
    return 0;
}

export default {
	data() {
		return {
            input: '',
			items: [],
		};
	},
	mounted() {
        this.$data.items = this.$site.pages.filter( x => x.regularPath.substring(0,9) === '/plugins/' && x.regularPath.length > 9)
        this.$data.items.sort(compareFn)
	},
	methods: {
		showDWC() {
			this.input = "dwc";
		},
		showSBC() {
			this.input = "sbc";
		},
		showRRF() {
			this.input = "rrf";
		},
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