<template lang="pug">
span.chip
  i.chip-icon.material-icons(v-if="icon") {{ icon }}
  span.chip-text {{ text }}
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
  },
  data: () => ({}),
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
