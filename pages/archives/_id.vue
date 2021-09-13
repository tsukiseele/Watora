<template lang="pug">
#container
  TheBanner(v-if='archive', :title='archive.title', :cover='archive.cover.url', :subtitle='header.subtitle', :disableTyping='false')
  main#main
    .archive
      .content
        .markdown
          client-only
            SMarkdown(:content='archive.markdown')
        .aside(v-if="archive.menu && archive.menu.length > 0")
          ul.aside-menu
            li.aside-menu-item(v-for='item in archive.menu') {{ item.level + " - " + item.title }}
      client-only
        SComment(:title='this.$route.path')
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    markdown: {
      toolbars: {
        fullscreen: false,
      },
    },
  }),
  computed: {
    ...mapState(['archive']),
    header() {
      return {
        title: this.archive ? this.archive.title : '无题',
        subtitle: this.archive ? this.archive.description : '无题',
        isHideSubtitle: true,
        isHide: true,
      }
    },
  },
  methods: {
    onNavClick(target) {
      document.getElementById(target.title).scrollIntoView({ behavior: 'smooth' })
    },
  },
  async fetch({ store, params }) {
    const id = parseInt(params.id)
    await store.dispatch('archive', { id })
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
@import './_id.scss';
</style>
