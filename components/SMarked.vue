<template lang="pug">
.md-preview
  #md(v-html="markdown")
</template>

<script>
import marked from "marked";
import DOMPurify from "dompurify";

import hljs from "highlight.js";
/*
import hljs from "highlight.js/lib/core";
// const hljs = require('highlight.js/lib/core');
hljs.registerLanguage("xml", require("highlight.js/lib/languages/xml"));
hljs.registerLanguage("language-java", require("highlight.js/lib/languages/java"));
hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript")
);
hljs.registerLanguage("kotlin", require("highlight.js/lib/languages/kotlin"));
hljs.registerLanguage("shell", require("highlight.js/lib/languages/shell"));
hljs.registerLanguage("css", require("highlight.js/lib/languages/css"));
hljs.registerLanguage("scss", require("highlight.js/lib/languages/scss"));
hljs.registerLanguage("less", require("highlight.js/lib/languages/less"));
hljs.registerLanguage("go", require("highlight.js/lib/languages/go"));
hljs.registerLanguage("bash", require("highlight.js/lib/languages/bash"));
hljs.registerLanguage("python", require("highlight.js/lib/languages/python"));
hljs.registerLanguage("c", require("highlight.js/lib/languages/c"));
hljs.registerLanguage("sql", require("highlight.js/lib/languages/sql"));*/
const renderer = new marked.Renderer()
marked.setOptions({
  renderer,
  highlight: (code) => hljs.highlightAuto(code).value,
})

export default {
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data: () => ({}),
  computed: {
    markdown() {
      if (!this.$isServer) {
        const md = marked(this.value);
        console.log("============== marked ==============", md);

        // const hl = hljs.highlightAuto(marked).value;
        
        console.log({md});
        // console.log({hl});
        console.log("============== hljs ==============", md);

        return DOMPurify.sanitize(md);
      }

      return "";
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.md {
  background-color: var(--card);
  color: var(--text);
}
</style>