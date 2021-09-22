<template lang="pug">
#timeline
  
//- #container
  main#main
    .timeline
      .timeline-group(v-for='(group, key) in timeline', :key='key')
        p.timeline-group-title {{ key }}
        .timeline-item(v-for='(item, index) in group', :key='index', @click='$router.push(`/archives/${item.articleId}`)')
          span.timeline-item-tags
            i.fa.fa-tag(style='padding: 0 0.2rem') 
            span {{ item.articleType || "未分类" }}
          span.timeline-item-title {{ item.articleTitle }}
</template>

<script>
export default {
  data: () => ({
    archives: [],
    error: null,
  }),
  fetch() {
    this.$store.commit('header', { title: '『时间线』' })
  },
  /*
  async asyncData({ app }) {
    let archives
    const res = await app.$api.getAllArticles()
    if (res.ok) {
      archives = res.data
    }
    return {
      archives,
    }
  },*/
  computed: {

  },
  mounted() {
    console.log(this.timeline)

  },
  async fetch({ store, params }) {
    await Promise.all([store.dispatch('categorys')])
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
