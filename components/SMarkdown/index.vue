<template lang="pug">
.markdown-preview
  .markdown-content(v-html="markdown")
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: null,
    },
  },
  data: () => ({}),
  created() {},
  computed: {
    markdown() {
      try {
        return this.$markdown(this.content);
      } catch (error) {
        console.log(error);
      }
      return null;
    },
  },
  methods: {},

  created() {
    /*
    if (this.$isNight()) {
      console.log(this.$isNight());
      console.log("===================================");
      require("highlight.js/styles/atom-one-dark.css");
    } else {
      require("highlight.js/styles/stackoverflow-light.css");
    }*/
  },
  mounted() {},
};
</script>

<style lang="scss">
// @import "highlight.js/styles/atom-one-dark.css";
@import "highlight.js/styles/stackoverflow-light.css";
@import "./index.scss";
/*
:root[theme="dark"] {
  @import "./theme/dark.scss";
}*/
</style>

<style lang="scss" scoped>
::v-deep {
  img {
    width: 100%;
    object-fit: cover;
  }
  pre,
  code {
    padding: 0.5rem;
    border-radius: 5px;
  }
  .table-wrap {
    overflow: auto;
    width: 100%;
  }
}
.markdown-preview {
  background-color: var(--card);
}
.markdown-content {
  overflow: hidden;
  padding: 0 0.5rem;
}
</style>