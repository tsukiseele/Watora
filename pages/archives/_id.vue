<template lang="pug">
#container
  TheBanner(v-if='archive', :title='header.title', :cover='header.cover', :subtitle='header.subtitle', :disableTyping='false')
  main#main
    .archive
      .content
        .markdown
          client-only
            SMarkdown(:content='archive.markdown', @activeChange='onMarkdownScroll')
        .aside(v-if='!isMobile && archive.nav && archive.nav.length > 0')
          STitleNav(:nav='archive.nav' :activeIndex="activeIndex")
      client-only
        SComment(:title='this.$route.path')
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data: () => ({
    activeIndex: null
  }),
  computed: {
    ...mapState(['archive']),
    ...mapGetters(['isMobile']),
    header() {
      return {
        title: this.archive ? this.archive.title : '无题',
        subtitle: this.archive ? this.archive.description : '',
        cover: this.archive ? this.archive.cover.url : null,
        isHideSubtitle: true,
        isHide: true,
      }
    },
  },
  methods: {
    onMarkdownScroll({ index, item }) {
      this.activeIndex = index
    },
  },
  async fetch({ store, params }) {
    const id = parseInt(params.id)
    await store.dispatch('archive', { id })
  }
}
</script>

<style lang="scss" scoped>
@import './_id.scss';
</style>
