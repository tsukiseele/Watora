<template lang="pug">
span.pill
  i.pill-icon(v-if="icon", :class="icon")
  span.pill-text
    slot
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>

.pill {
  
  display: inline-block;
  border-radius: .8rem;
  padding: 0 .5rem;
  line-height: 1.6rem;
  transition: filter 0.3s;
  border: 1px solid var(--theme-primary);
  box-shadow: 0 1px 6px var(--theme-primary);
  cursor: pointer;
  &:hover {
    filter: brightness(0.8);
  }
  .pill-text {
    font-size: .8rem;
    color: var(--text);
  }
}
</style>