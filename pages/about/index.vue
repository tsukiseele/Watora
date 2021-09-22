<template lang="pug">
#main.card
  TheBanner(:title='header.title', :subtitle='header.subtitle', :isFull='header.isFull', :isHide='header.isHide', :isHideSubtitle='header.isHideSubtitle')
  .about
    .blockquote
      i.material-icon.home
      .quote-content TECH OTAKUS SAVE THE WORLD
      i.fa.fa-quote-right
    .description(v-for='(part, i) in about', :key='i')
      .subtitle {{ part.title }}
      SMarkdown(:content="part.content")
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    header: {
      title: 'ABOUT',
      subtitle: '',
    },
  }),
  computed: {
    ...mapState(['about']),
  },
  async fetch({ store }) {
    await store.dispatch('about')
  },
}
</script>
<style lang="scss" scoped>
@import './index.scss';

.content {
}
</style>

