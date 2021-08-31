<template lang="pug">
client-only
  .markdown-preview
    .markdown-content.card(v-html="markdown")
</template>

<script>
import marked from "marked";
import DOMPurify from "dompurify";
// import "highlight.js/styles/atom-one-dark.css";
/*
import "highlight.js/styles/atom-one-dark-reasonable.css";
import "highlight.js/styles/vs2015.css";
import "highlight.js/styles/stackoverflow-dark.css";
import "highlight.js/styles/night-owl.css";*/
let CODE_ID = 0;
const CODE_COPY_LIST = [];

if (process.client) {
  const hljs = require("@/plugins/highlight.js");
  const renderer = new marked.Renderer();

  renderer.code = function code(_code, infostring, escaped) {
    CODE_ID++;
    const id = `code-${CODE_ID}`;
    CODE_COPY_LIST.push({ id, code: _code });
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(_code, lang);
      if (out != null && out !== _code) {
        escaped = true;
        _code = out;
      }
    }
    if (!lang) {
      return `<pre class="hljs"><code>${_code}</code><i id="${id}" class="icon icon-clipboard code-copy"></i></pre>`;
    }
    return `<pre class="hljs ${this.options.langPrefix + lang}"><code class="${
      this.options.langPrefix + lang
    }">${_code}</code><i id="${id}" class="icon icon-clipboard code-copy"></i></pre>\n`;
  };

  renderer.table = function (header, body) {
    if (body) body = `<tbody>${body}</tbody>`;
    return `<div class="table-wrap">\n<table>\n<thead>\n${header}</thead>\n${body}</table>\n</div>\n`;
  };

  marked.setOptions({
    renderer,
    highlight: (code) => hljs.default.highlightAuto(code).value,
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });
}

export default {
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data: () => ({}),
  created() {},
  computed: {
    markdown() {
      return this.$isServer || DOMPurify.sanitize(marked(this.value));
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss">
@import "./theme/index.scss";

  @import "highlight.js/styles/atom-one-dark.css";
:root[theme="dark"] {
  @import "./theme/dark.scss";
  // @import "highlight.js/styles/stackoverflow-dark.css";
  
}

</style>

<style lang="scss" scoped>
/*
@import "./theme/index.scss";
@import "highlight.js/styles/stackoverflow-light.css";
:root[theme="dark"] {
  @import "./theme/dark.scss";
  @import "highlight.js/styles/stackoverflow-dark.css";
}*/
::v-deep img {
  width: 100%;
  object-fit: cover;
}
.markdown-preview {
  
  margin: 0;
}
.markdown-content {
  overflow: hidden;
  padding-top: 1rem;
}
.table-wrap {
  overflow: auto;
  width: 100%;
}
.card {
  margin-top: 0!important;
  padding-top: 0!important;
}
pre,
code {
  border-radius: var(--radius);
}

</style>