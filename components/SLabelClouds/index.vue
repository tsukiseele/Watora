<template lang="pug">
  .label-clouds
    SChip.label-item(v-for="(label, i) in labels" :key="i" :text="label.name" icon="sell" @click="onItemClick(label)" :style="{ color: '#' + label.color }")
</template>

<script>
export default {
  props: {
    labels: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    
  }),
  methods: {
    
  },
  mounted() {
    console.log(this.labels);
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>