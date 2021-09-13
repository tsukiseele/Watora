<template lang="pug">
#container
  TheBanner(v-if='archive', :title='archive.title', :cover='archive.cover.url', :subtitle='header.subtitle', :disableTyping='false')
  main#main
    .archive
      .content
        .markdown
          client-only
            SMarkdown(:content='archive.markdown')
        .aside(v-if="!isMobile && archive.nav && archive.nav.length > 0")
          ul.aside-nav
            li.aside-nav-item(v-for='(item, i) in archive.nav' :key="i" :class='"h" + item.level' ) 
              span.aside-nav-text(@click="onNavClick(item)") {{  item.title }}
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
    ...mapState(['isMobile', 'archive']),
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
    onNavClick(item) {
      const target = document.getElementById(item.title.replace(" ", "-").toLowerCase());
      target && target.scrollIntoView({ behavior: 'smooth' })
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
