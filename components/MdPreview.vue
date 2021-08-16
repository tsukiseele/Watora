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
$md-text: #abb2bf;

$md-bg: #202124; //#292c34;
$md-link: #f596aa;
$md-hr: #f596aa;

$md-h1-border: #f596aa;
$md-blockquote-bg: #484d5c;
$md-blockquote-left: #f596aa;

:root[theme="dark"] .markdown-preview {
  font-family: inherit !important;

  border: none !important;
  color: $md-text !important;
  background-color: $md-bg !important;
  code {
    font-family: Menlo, Consolas, "Courier New", Courier, FreeMono, monospace;
  }
  div {
    color: $md-text !important;
    background-color: $md-bg !important;
  }

  a {
    color: $md-link !important;
  }

  p,
  li {
    color: $md-text !important;
  }
  li::after {
    background-color: $md-text !important;
  }
  blockquote {
    display: flex;
    flex-direction: column;

    background-color: $md-blockquote-bg !important;
    // border-left: 5px solid $md-blockquote-left;
    border-left: 0;
    box-shadow: inset 0 10px 10px -10px #ccc, inset 0 -10px 10px -10px #ccc;
    p {
      margin: 5px 0;
    }

    &::after {
      content: "\f10d";
      font-family: Fontello;
      align-self: flex-end;
    }

    &::before {
      content: "\f10e";
      font-family: Fontello;
      align-self: flex-start;
    }
  }

  hr {
    color: $md-hr;
    border-top: 3px dashed $md-hr;
  }

  input[type="checkbox"]:before {
    color: $md-text;
    background-color: $md-bg;
  }

  table {
    color: $md-text !important;
    background-color: $md-bg !important;
    th,
    tr,
    td {
      color: $md-text !important;
      background-color: $md-bg !important;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: $md-text !important;
  }
  h1 {
    border-bottom: none; //1px solid $md-h1-border;
  }
}
</style>

<style lang="scss" scoped>
</style>
