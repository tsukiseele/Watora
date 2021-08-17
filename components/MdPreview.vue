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
// $md-link: #f596aa;
$md-link: #00796b;
$md-hr: #f596aa;
$md-border: #f596aa;

$md-h1-border: #f596aa;
$md-blockquote-bg: #484d5c;
$md-blockquote-left: #f596aa;

$md-block-bg: rgba(
  $color: #7f7f7f,
  $alpha: 0.1,
);

$md-colors-1: #ec407a;
$md-colors-2: #7e57c2;
$md-colors-3: #5c6bc0;
$md-colors-4: #29b6f6;
$md-colors-5: #26a69a;
$md-colors-6: #ffca28;
$md-colors-7: #ff7043;

:root .markdown-preview {
  font-family: "Lucida Grande", "Lucida Sans Unicode", Helvetica, Arial, Verdana, sans-serif;
  /*
  font-family: "Cursive", "Fira Mono", "Noto Serif SC", -apple-system, Roboto,
    "Helvetica Neue", sans-serif !important;
*/
  // font-family: Fontello, inherit !important;
  h1 {
    font-size: 1.8rem;
    border-bottom: 1px solid $md-hr;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.33rem;
    margin: 16px 0 16px -8px;
    padding: 0 0 0 6px;
    background-color: $md-block-bg;
    &:nth-of-type(7n) {
      border-left: 4px solid $md-colors-1;
    }
    &:nth-of-type(7n + 1) {
      border-left: 4px solid $md-colors-2;
    }
    &:nth-of-type(7n + 2) {
      border-left: 4px solid $md-colors-3;
    }
    &:nth-of-type(7n + 3) {
      border-left: 4px solid $md-colors-4;
    }
    &:nth-of-type(7n + 4) {
      border-left: 4px solid $md-colors-5;
    }
    &:nth-of-type(7n + 5) {
      border-left: 4px solid $md-colors-6;
    }
    &:nth-of-type(7n + 6) {
      border-left: 4px solid $md-colors-7;
    }
  }
  h4 {
    font-size: 1.2rem;
  }
  h5 {
    font-size: 1.1rem;
  }
  h6 {
    font-size: 1rem;
  }
  a {
    font-family: InfoDisplay !important;
    color: $md-link !important;
  }
  code {
    font-family: Menlo, Consolas, "Courier New", Courier, FreeMono, monospace;
    background-color: $md-block-bg;
  }
  hr {
    // color: $md-hr;
    border-top: 2px dashed $md-hr;
  }
  blockquote {
    display: flex;
    flex-direction: column;
    border-left: 0;
    // box-shadow: inset 0 10px 10px -10px #ccc, inset 0 -10px 10px -10px #ccc;
    background-color: $md-block-bg;
    p {
      margin: 5px 1rem;
    }
    &::after {
      content: "\f10e";
      font-family: Fontello;
      align-self: flex-end;
    }

    &::before {
      content: "\f10d";
      font-family: Fontello;
      align-self: flex-start;
    }
  }
  h1,
  h2,
  h4,
  h5,
  h6 {
    color: $md-bg;
    padding: 0;
    margin: 8px 0;
  }
}

:root[theme="dark"] .markdown-preview {
  border: none !important;
  color: $md-text !important;
  background-color: $md-bg !important;

  div {
    color: $md-text !important;
    background-color: $md-bg !important;
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

  h1 {
    border-bottom: none; //1px solid $md-h1-border;
  }
}
</style>

<style lang="scss" scoped>
</style>
