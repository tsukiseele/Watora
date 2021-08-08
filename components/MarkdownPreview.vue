<template>
  <mavon-editor 
    ref="md" 
    defaultOpen="preview"
    :toolbarsFlag="false" 
    :subfield="false" 
    v-model="value"
    codeStyle="atom-one-dark">
  </mavon-editor>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    }
  },
  data: () => ({
    content: '',
  }),
  watch: {
    value(val) {
      this.content = val;
    },
    content() {
      this.$emit('input', value);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>