<template lang="pug">
.comment
  Vssue(:title="title")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  }
};
</script>

<style lang="scss" scoped>
::v-deep .vssue {
  a {
    &::before,
    &::after {
      display: none;
    }
  }
}
</style>