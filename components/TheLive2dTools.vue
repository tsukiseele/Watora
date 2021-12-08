<template lang="pug">
#live-tools
  .tool-btn(
    v-for="(btn, i) in btns",
    :key="i",
    :id="btn.on",
    v-show="!isHidden",
    icon,
    small,
    @click="$emit(btn.on)"
  )
    i.material-icons {{ btn.icon }}
  .tool-btn(:id="isHidden ? options.on : ''", small, @click="onHidden")
    i.material-icons(v-if="options && options.icon") {{ btn.icon }}
    i.material-icons(v-else) {{ hideIcon }}
</template>

<script>
export default {
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
    btns: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    iconType: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    isHidden: false,
  }),
  methods: {
    onHidden() {
      this.isHidden = !this.isHidden;
      this.$emit(this.options.on);
    },
  },
  computed: {
    hideIcon() {
      if (this.options && this.options.icon) {
        return this.isHidden
          ? this.options.icon.show
          : this.options.icon.hidden;
      } else {
        return this.isHidden ? "Show" : "Hide";
      }
    },
  },
  mounted() {
    this.isHidden = this.hidden;
  },
};
</script>

<style lang="scss" scoped>
.tool-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--color-card);
  user-select: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  margin: 3px 0;
  svg,
  i {
    transition: 0.2s ease;
    color: var(--color-text);
    &:hover {
      color: var(--color-text-primary);
    }
  }
}
</style>