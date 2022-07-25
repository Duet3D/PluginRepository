<template>
  <main class="page">
    <slot name="top" />

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

</style>