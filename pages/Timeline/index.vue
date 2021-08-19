<template lang="pug">
  #container
    main#main
      .timeline
        .timeline-group(v-for="(group, key) in timeline" :key="key")
          p.timeline-group-title {{ key }}
          .timeline-item(v-for="(item, index) in group" :key="index" @click="$router.push(`/archives/${item.articleId}`)")
              span.timeline-item-tags
                i.fa.fa-tag(style="padding: 0 .2rem;") 
                span {{ item.articleType || '未分类'}} 
              span.timeline-item-title {{ item.articleTitle }}
    //- div adasdasd{{$imgs.avatar}}
    //- img(:src="$imgs.avatar")

</template>

<script>
export default {
  data: () => ({
    archives: [],
    error: null
  }),
  fetch() {
    this.$store.commit("header", { title: "『时间线』" });
  },
  async asyncData({ app }) {
    let archives;
    const res = await app.$api.getAllArticles();
    if (res.ok) {
      archives = res.data;
    }
    return {
      archives
    };
  },
  computed: {
    timeline() {
      if (this.archives) {
        const timeline = {}
        for(const article of this.archives) {
          const date = new Date(article.articleDate);
          const group = `${date.getFullYear()}年${date.getMonth()}月`;
          if (group in timeline) {
            timeline[group].push(article);
          } else {
            timeline[group] = [article];
          }
        }
        return timeline;
      } else {
        return [];
      }
    }
  },
  mounted() {
    console.log(this.timeline);
  }
};
</script>

<style lang="scss" scoped>
/*
#container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}*/

#main {
  margin: 1rem auto;
  background: var(--card);
  border-radius: 0.5rem;
}

.timeline {
  padding: 2rem;
  transition: 0.3s;

  .timeline-group {
    padding: 0.33rem 0;
    .timeline-group-title {
      color: var(--text-secondary);
    }
  }

  .timeline-item {
    cursor: pointer;
    padding-left: 2rem;
    line-height: 2rem;
    border-radius: 5px;
    transition: background 0.3s ease;

    &:hover {
      background: var(--card-active);
      .timeline-item-title {
        padding-left: 1rem;
      }
    }
  }

  .timeline-item-title {
    color: var(--text-primary);
    font-weight: 300;
    font-family: InfoDisplay;
    padding: 0 0.33rem;
    transition: padding 0.3s;
  }

  .timeline-item-tags {
    // border: 1px solid var(--theme-primary);
    border-radius: 3px;
    color: var(--text);
    font-weight: 300;
    font-size: 0.8rem;
    padding: 0.125rem;
  }
}
</style>
