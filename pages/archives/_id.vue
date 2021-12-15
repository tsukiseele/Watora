<template lang="pug">
#container
  TheBanner(v-if='archive',  :disableTyping='true', :isHide='header.isHide')
  //- :title='header.title', :cover='header.cover', :subtitle='header.subtitle',
  main#main
    .archive
      .content
        .markdown
          client-only
            SMarkdown(:content='archive.markdown', @activeChange='onMarkdownScroll', @imageClick="onImageClick" @loaded="onMarkdownLoaded")
        .aside(v-if='!isMobile && titles && titles.length > 0')
          STitleNav(:nav='titles', :activeIndex="titlesActiveIndex")
      client-only
        SComment(:title='this.$route.path')
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data: () => ({
    titlesActiveIndex: null,
    titles: null,
  }),
  computed: {
    ...mapState(['archive']),
    ...mapGetters(['isMobile']),
    header() {
      return {
        title: this.archive ? this.archive.title : '无题',
        subtitle: this.archive ? this.archive.description : '',
        // cover: this.archive ? this.archive.cover.url : null,
        isHideSubtitle: true,
        isHide: true,
      }
    },
  },
  methods: {
    onMarkdownLoaded({ html, titles }) {
      this.titles = titles
    },
    onMarkdownScroll({ index, item }) {
      this.titlesActiveIndex = index
    },
    onImageClick(e) {
    },
  },
  async fetch({ store, params }) {
    const id = parseInt(params.id)
    await store.dispatch('archive', { id })
  },
}
</script>

<style lang="scss" scoped>
@import './_id.scss';
</style>
