<template>
  <main class="page">
    <slot name="top" />

    <div class="lgside ">
        <section class="card2">
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
    <!-- <div class="xsbelow">xyz</div> -->
    <Content class="theme-default-content" />


    <div class="xsbelow theme-default-content">

        <section class="card2">
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
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@vuepress/theme-default/components/PageEdit.vue'
import PageNav from '@vuepress/theme-default/components/PageNav.vue'

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">

$wrapper
  max-width $sidebarWidth
  margin 0 auto
  padding 2rem 2.5rem
  @media (max-width: $MQNarrow)
    padding 2rem
  @media (max-width: $MQMobileNarrow)
    padding 1.5rem

.page
  padding-bottom 2rem
  display block

.lgside
  font-size 16px
  background-color #fff
  width $sidebarWidth
  position fixed
  z-index 10
  margin 0
  top $navbarHeight*2
  right 0
  bottom 0
  padding-top 2rem
  box-sizing border-box
  border-right 1px solid $borderColor
  overflow-y auto

.xsbelow
  background-color #fff


@media (min-width: (1400px))
  .theme-container.no-sidebar
    .xsbelow
      display none

    .page
      padding-left 0

@media (max-width: (1400px))
  .theme-container.no-sidebar
    .lgside
      display none

    .page
      padding-left 0


</style>