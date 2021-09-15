<template lang="pug">
#gallery
  TheBanner(:cover="banner.cover")
  .gallery-list
    client-only
      SWaterfall(:disableScroll='true' :imgsArr='images' srcKey='url' @itemClick="onItemClick")
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    banner: {
      cover: null
    },
    imgsArr: [],
  }),
  computed: {
    ...mapState(['images'])
  },
  
  methods: {
    onItemClick(cover) {
      this.banner.cover = cover.value.url
      console.log(this.banner.cover);
    }
  },
  async fetch({ store, params }) {
    await store.dispatch("images")
  },
  mounted() {
    console.log(this.images);
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>