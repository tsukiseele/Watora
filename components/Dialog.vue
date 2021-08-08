<template lang="pug">
.dialog(v-if="show", ref="dialog")
  .dialog-wrap
    .dialog-title {{ title }}
    .dialog-text {{ text }}
    .dialog-opt
      input.dialog-button.confirm(
        type="button",
        value="确认",
        @click="onConfirm()"
      )
      input.dialog-button.cancel(
        type="button",
        value="取消",
        @click="onCancel()"
      )
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    confirm: {
      type: Function,
      default: null,
    },
    cancel: {
      type: String,
      default: null,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onCancel() {
      if (this.cancel) this.cancel();
      this.show = false;
    },
    onConfirm() {
      if (this.confirm) this.confirm();
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;

  .dialog-wrap {
    display: flex;
    flex-direction: column;
    height: 40vh;
    width: 30vw;
    background: white;
    z-index: 10;
    border-radius: 5px;
    box-shadow: 3px 3px 9px var(--gray-light);
    padding: 1rem;
    font-family: InfoDisplay;

    .dialog-title {
    }
    .dialog-text {
      flex-grow: 1;
    }

    .dialog-opt {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>