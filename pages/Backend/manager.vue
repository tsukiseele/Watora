<template lang="pug">
  #container
    ul.list
      li.list-item(v-for="(item, i) in articles" :key="i")
        span {{ item.articleTitle }}

</template>

<script>
export default {
  layout: "backend",
  data: () => ({
    articles: []
  }),
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error}) {
    let articles = []
    try {
      const resp = await app.$api.getAllArticles();
      if (resp.ok) {
        articles = resp.data;
      }
    } catch(e) {
      console.log(e);
    }
    return {
      articles
    }
  },
}
</script>

<style lang="scss" scoped>

</style>