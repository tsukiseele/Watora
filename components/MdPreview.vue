<template lang="pug">
//- <mavon-editor 
//-   ref="md" 
//-   defaultOpen="preview"
//-   :toolbarsFlag="false" 
//-   :subfield="false" 
//-   v-model="value"
//-   codeStyle="atom-one-dark">
//- </mavon-editor>
.md-preview
  Markdown(
    :value="content",
    :isPreview="true",
    theme="oneDark",
    height="auto",
    :bordered="false"
  )
</template>

<script>
export default {
  components: {},
  props: {
    content: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    isReadOnly: true,
    // editorData: "<p>Content of the editor.</p>",
    editorConfig: {
      isReadOnly: true,
      // The configuration of the editor.
    },
    // content: ""
  }),
  computed: {
    /*
    editor() {
      const editor = require("@ckeditor/ckeditor5-build-inline");
      editor.isReadOnly = true;
      console.log(editor);
      return editor;
    }*/
  },
  watch: {
    /*
    value(newVal) {
      this.content = newVal;
    },
    content(newVal) {
      this.$emit("input", newVal);
    }*/
  },
};
</script>

<style lang="scss" >

</style>

<style lang="scss" scoped>
</style>
