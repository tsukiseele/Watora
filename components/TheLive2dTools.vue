<template lang="pug">
#live-tools
  .tool-btn(
    v-for="(btn, i) in btns",
    :key="i",
    :id="btn.on",
    v-show="!isHidden",
    icon,
    small,
    @click="click(btn.on)"
  )
    i.fa(:class="btn.icon")

  .tool-btn(:id="isHidden ? 'show' : 'hide'", icon, small, @click="hide")
    i.fa(:class="ico")
</template>

<script>
export default {
  props: {
    btns: Array,
    hidden: Boolean,
  },
  data: () => ({
    isHidden: false,
  }),
  methods: {
    click(on) {
      this.$emit(on);
    },
    hide() {
      this.isHidden = !this.isHidden;
      this.$emit("hide");
    },
  },
  computed: {
    ico() {
      return this.isHidden ? "fa-eye" : "fa-eye-slash";
    },
  },
  mounted() {
    this.isHidden = this.hidden;
  },
};
</script>

<style lang="scss" scoped>
.tool-btn {
  border-radius: 50%;
  background-color: var(--card);
  i {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.2rem 0;
    width: 32px;
    height: 32px;
    transition: 0.2s ease;
    color: var(--text);
    &:hover {
      color: var(--text-primary);
    }
  }
}
</style>