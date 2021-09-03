<template lang="pug">
.category.card
  .category-title 归档
  nuxt-link.category-item.normal(
    v-for="(category, i) in categorys",
    :key="i",
    :to="`/category/${category.id}`"
  ) 
    .category-name {{ category.title }}
</template>

<script>
export default {
  props: {
    categorys: {
      type: Array,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>