<template>
	<div>
        <br>
		<h2>All Plugins</h2>
        <br>
            
        <section class="card2" v-for="item in items" :key="item">
            <div class="div_1">
                <div class="div_2">
                    <a target="_self" :href="`/PluginRepository/plugins/${item}.html`">
                        <img src="https://static.npmjs.com/26de4581a89de8a6501ce9a3dbb06b85.svg" title="public package" class="img_1">
                        <h3 class="h3_class">{{item}}</h3>
                    </a>
                    <span id="pkg-list-exact-match" class="highlight_1">OEM</span>
                </div>
                <p class="description_1">Simple, synchronous deflate/inflate for buffers</p>
                <div class="card_footer">
                    <span title="Release and Date" aria-hidden="true" class="card_footer_1">🔖 v3.4 📅 2022-05-15</span>
                </div>
                <ul class="keyword_1">
                    <li><a href="/search?q=keywords:zlib" class="keyword_list_1">zlib</a></li>
                    <li><a href="/search?q=keywords:deflate" class="keyword_list_1">deflate</a></li>
                </ul>
            </div>
            <div class="stats_1">
                <div class="stats_2">
                    <div class="stats_3" title="Maintenance 0%">
                        <div class="stats_4 color_red" style="transform: scaleX(0.5);"></div>
                        <div class="stats_4b">M</div>
                    </div>
                    <div class="stats_3" title="Quality 67%">
                        <div class="stats_4 color_blue" style="transform: scaleX(0.67285);"></div>
                        <div class="stats_4b">Q</div>
                    </div>
                    <div class="stats_3" title="Popularity 32%">
                        <div class="stats_4 color_green" style="transform: scaleX(0.319384);"></div>
                        <div class="stats_4b">P</div>
                    </div>
                </div>
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