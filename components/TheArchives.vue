<template lang="pug">
.archive.card
  .archive-title 归档
  nuxt-link.archive-item.normal(
    v-for="(articles, date) in archives",
    :key="date",
    :to="`/archives/${articles[0].articleId}`"
  ) 
    span.article-date {{ date }}
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      default: undefined,
    },
  },
  computed: {
    archives() {
      if (this.articles) {
        let timeline = {};
        for (let article of this.articles) {
          let date = new Date(article.articleDate);
          let group = `${date.getFullYear()} ${this.dateNumConvert(date.getMonth())}月`//`${date.getFullYear()} ${date.getMonth()}`;
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
    },
  },
  methods: {
    dateNumConvert(number) {
      var dict = {
        0: "零",
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "七",
        8: "八",
        9: "九",
        10: "十",
        11: "十一",
        12: "十二",
        13: "十三",
        14: "十四",
        15: "十五",
        16: "十六",
        17: "十七",
        18: "十八",
        19: "十九",
        20: "二十",
        21: "二十一",
        22: "二十二",
        23: "二十三",
        24: "二十四",
        25: "二十五",
        26: "二十六",
        27: "二十七",
        28: "二十八",
        29: "二十九",
        30: "三十",
        31: "三十一",
      };
      return dict[number];
    },
  },
};
</script>

<style lang="scss" scoped>
.archive {
  color: var(--text);
}
.archive-title {
  font-size: 1.2rem;

  font-weight: bold;
}
.archive-item {
  display: block;
  padding: .2rem .5rem;
  border-radius: 5px;
  transition: color .3s, background 0.3s;
  &:hover {
    color: var(--text-primary);
    background: var(--card-active);
  }
}
</style>