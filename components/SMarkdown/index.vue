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

@import './theme.scss';

@import './index.scss';
/*
:root[theme="dark"] {
  @import "./theme/dark.scss";
}*/
</style>

<style lang="scss">

</style>