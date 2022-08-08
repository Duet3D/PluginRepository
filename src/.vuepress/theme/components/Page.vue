<template>
  <main class="page">
    <slot name="top" />

    <div class="lgstyling" v-if="this.$page.frontmatter.plugin">
      <SideSummary/>
    </div>

    <Content class="theme-default-content" />

    <div class="mobilestyling theme-default-content"  v-if="this.$page.frontmatter.plugin">
      <SideSummary/>
    </div>
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@vuepress/theme-default/components/PageEdit.vue'
import PageNav from '@vuepress/theme-default/components/PageNav.vue'
import SideSummary from './SideSummary.vue'

export default {
  components: { PageEdit, PageNav, SideSummary },
  props: ['sidebarItems'],
	data() {
		return {
			items: {},
		};
	},
	mounted() {
	}
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

.lgstyling
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

.mobilestyling
  background-color #fff


@media (min-width: (1400px))
  .theme-container.no-sidebar
    .mobilestyling
      display none

    .page
      padding-left 0

@media (max-width: (1400px))
  .theme-container.no-sidebar
    .lgstyling
      display none

    .page
      padding-left 0


</style>