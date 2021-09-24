<template lang="pug">
.post-item(@click="$router.push(to)")
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
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
