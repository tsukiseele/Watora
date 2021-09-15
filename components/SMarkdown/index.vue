<template lang="pug">
.markdown-preview
  .markdown-content(v-html='markdown')
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    _timer: null,
  }),
  computed: {
    markdown() {
      try {
        return this.$markdown(this.content)
      } catch (error) {
        console.log(error)
      }
      return null
    },
  },
  methods: {
    getNavPos() {
      if (this._timer) return
      this._timer = setTimeout(() => {
        const titles = document.querySelectorAll(".markdown [id^='md-title']")
        if (titles.length === 0) return
        let title, i
        for (i = 0; i < titles.length; i++) {
          const rect = titles[i].getBoundingClientRect()
          if (rect.top - rect.height > 0) break
        }
        this.$emit('activeChange', { index: i - 1, item: title })
        clearTimeout(this._timer)
        this._timer = null
      }, 200)
    },
  },
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
  mounted() {
    window.addEventListener('scroll', this.getNavPos)
  },
  destroyed() {
    window.removeEventListener('scroll', this.getNavPos)
  },
}
</script>

<style lang="scss">
// @import "highlight.js/styles/atom-one-dark.css";
@import 'highlight.js/styles/stackoverflow-light.css';
@import './index.scss';
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
  // display: flex;
  overflow-y: visible;
  background-color: var(--card);
  position: relative;
  // align-items: stretch;
}
.markdown-content {
  flex: 1;
  overflow: hidden;
  padding: 0 0.5rem;
}
.aside {
  position: relative;
  width: 200px;
  right: 0;
  // align-self: stretch;
}
.aside .nav-menu {
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: flex-start;

  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    padding-left: 0.5rem;
  }
}
</style>