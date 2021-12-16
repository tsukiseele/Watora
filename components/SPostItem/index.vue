<template lang="pug">
.post-item(@click="$router.push(to)" :style="backgroundColor")
  .item-cover-box
    img.item-cover(v-lazy="cover || placeholder")
  .item-info 
    .item-title {{ title }}
    span.item-preview {{ description }}
    ul.item-labels
      li.item-label
        SChip(:text="date | formatTimeAgo", icon="event_note")
      li.item-label(v-for="(label, i) in labels", :key="i")
        SChip(:text="label.name", icon="sell")
  .item-category 
    i.category-icon.material-icons bookmark
    span.category-text {{ category ? category.title : '未分类' }}
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    cover: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    labels: {
      type: Array,
      default: () => [],
    },
    category: {
      type: Object,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    backgroundColor: null,
  }),
  methods: {
    getColor(src) {
      return new Promise((resolve, reject) => {
        const colorThief = new ColorThief()
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.src = src
        if (img.complete) {
          resolve(colorThief.getColor(img))
        } else {
          img.addEventListener('load', () => resolve(colorThief.getPalette(img)))
          img.addEventListener('error', () => reject('Image failed to load'))
        }
      })
    },
  },
  async mounted() {
    try {
      const [dominant, palette1, palette2, palette3] = await this.getColor(this.cover)
      this.backgroundColor = { backgroundColor: `rgba(${dominant[0]}, ${dominant[1]}, ${dominant[2]}, .67)` }
      console.log(this.backgroundColor)
      console.log('colors', dominant, palette1, palette2, palette3)
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
