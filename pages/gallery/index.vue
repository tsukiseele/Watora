<template lang="pug">
#gallery
  TheBanner(:title='banner.title', :cover='banner.cover')
  .gallery-list
    client-only
      SSimpleWaterfall(:items="images" imageKey="url")
        template(v-slot="{ index, item }")
          span {{ item.title }}
      //- SWaterfall(:disableScroll='true', :imgsArr='images', srcKey='url', @itemClick='onItemClick')
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    banner: {
      title: '画廊',
      cover: null,
    },
    imgsArr: [],
  }),
  computed: {
    images() {
      return [...this.$store.state.images]
    },
  },
  methods: {
    onItemClick(cover) {
      this.banner.cover = cover.value.url
    },
  },
  async fetch({ store, params }) {
    await store.dispatch('images')
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
