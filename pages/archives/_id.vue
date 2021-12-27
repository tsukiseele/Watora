<template lang="pug">
#container
  TheBanner(v-if='archive',  :disableTyping='true', :isHide='header.isHide')
  //- :title='header.title', :cover='header.cover', :subtitle='header.subtitle',
  main#main
    .content
      .markdown
        client-only
          SMarkdown(:content='archive.markdown', @activeChange='onMarkdownScroll', @imageClick="onImageClick" @loaded="onMarkdownLoaded")
      .aside(v-if='!isMobile && titles && titles.length')
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
        cover: this.archive ? this.archive.cover.url : null,
        isHideSubtitle: true,
        // isHide: true,
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
    onImageClick(e) {},
    getColor(src) {
      return new Promise((resolve, reject) => {
        const colorThief = new ColorThief()
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.src = src
        if (img.complete) {
          resolve([colorThief.getColor(img), ...colorThief.getPalette(img)])
        } else {
          img.addEventListener('load', () => resolve([colorThief.getColor(img), ...colorThief.getPalette(img)]))
          img.addEventListener('error', () => reject('Image failed to load'))
        }
      })
    },
  },
  async mounted() {
    try {
      const [dominant, palette1, palette2, palette3] = await this.getColor(this.archive.cover.url)
      document.getElementById('background').style.background = `rgba(${dominant[0]}, ${dominant[1]}, ${dominant[2]}, 1)`
    } catch (error) {
      console.error(error)
    }
  },
  async fetch({ store, params }) {
    const id = parseInt(params.id)
    await store.dispatch('archive', { id })
  },
  async beforeDestroy() {
    document.getElementById('background').style.backgroundColor = `rgba(0, 0, 0, 0.12)`
  },
}
</script>

<style lang="scss" scoped>
@import './_id.scss';
</style>
