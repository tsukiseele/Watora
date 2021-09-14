<template lang="pug">
#container
  TheBanner(
    title="友链",
    subtitle="",
  )
  main#main
    ul
      li(v-for='category in categorys' :key="number" ) {{ category.description }}
    //- .list 
      .card(
        v-for="(link, index) in links",
        :key="index",
        data-aos="flip-left",
        data-aos-once="true"
      )
        img.link-icon(:src="link.linkIcon")
        .link-wrap 
          .link-name.single-line {{ link.linkName }}
          .link-info.single-line {{ link.linkInfo }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['categorys']),
  },
  async fetch({ store, params }) {
    await store.dispatch('categorys')
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
