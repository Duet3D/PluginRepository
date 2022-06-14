<template>
	<div>
        <br>
		<h2>All Plugins</h2>
        <br>
            
        <section class="card2" v-for="item in items" :key="item">
            <div class="div_1">
                <div class="div_2">
                    <a target="_self" :href="`/PluginRepository/plugins/${item}.html`">
                        <h3 class="h3_class">{{item}}</h3>
                    </a>
                    <span id="pkg-list-exact-match" class="highlight_1">OEM</span>
                </div>
                <p class="description_1">Lorem ipsum lorem ipsum</p>
                <ul class="card_footer">
                    <li><span title="Published Date" class="card_footer_1">📅 2022-01-05</span></li>
                    <li><span title="Release" class="card_footer_1">🔖 v3.4 </span></li>
                    <li><span title="Last Release Date" class="card_footer_1">📅 2022-05-16</span></li>
                </ul>
                <ul class="keyword_1">
                    <li><a href="/search?q=tag:keyword_1" class="keyword_list_1">keyword_1</a></li>
                    <li><a href="/search?q=tag:keyword_2" class="keyword_list_1">keyword_2</a></li>
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
			items: [],
		};
	},
	props: {
		gituser: String,
		gitrepo: String
	},
	mounted() {
		fetch(`https://api.github.com/repos/Duet3D/PluginRepository/contents/src/plugins`)
			.then(res => res.json())
			.then(data => {
                this.$data.items = data.flatMap(item => {
                    const name = item.name.slice(0, -3);
                    return name === 'README' ? [] : name    
                })
			});
	}
};
</script>