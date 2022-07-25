<template>
  <main class="page">
    <slot name="top" />

    <div class="margindiv"/>

    <div class="sidebar2">abc</div>
    <div class="sidebar3">xyz</div>
    <Content class="theme-default-content" />
    <PageEdit />

    <h1>aaaaaaaaa</h1>

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
  max-width $contentWidth
  margin 0 auto
  padding 2rem 2.5rem
  @media (max-width: $MQNarrow)
    padding 2rem
  @media (max-width: $MQMobileNarrow)
    padding 1.5rem

.page
  padding-bottom 2rem
  display block

.margindiv
  padding-top 25px


.sidebar2
  font-size 16px
  background-color #00ff00
  width $sidebarWidth
  position fixed
  z-index 10
  margin 0
  top $navbarHeight
  left 0
  bottom 0
  box-sizing border-box
  border-right 1px solid $borderColor
  overflow-y auto


.sidebar3
  font-size 16px
  background-color #00fff0
  width $sidebarWidth
  position fixed
  z-index 10
  margin 0
  top $navbarHeight
  right 0
  bottom 0
  box-sizing border-box
  border-right 1px solid $borderColor
  overflow-y auto

</style>