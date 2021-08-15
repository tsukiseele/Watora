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

<style lang="scss">
*::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
*::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
*::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
$md-text: #abb2bf;

$md-bg: #333333; //#292c34;
:root[theme="dark"] .markdown-preview {
  border: none !important;
  color: $md-text !important;
  background-color: $md-bg !important;
  > div {
    color: $md-text !important;
    background-color: $md-bg !important;
  }
  p,
  li {
    color: $md-text !important;
  }
  li::after {
    background-color: #abb2bf !important;
  }
  blockquote {
    background-color: #484d5c !important;
    p {
      margin: 5px 0;
    }
  }

  hr {
    color: gray;
    border-top: gray;
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
}
</style>

<style lang="scss" scoped>
</style>
