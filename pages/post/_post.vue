<template lang="pug">
#container
  main#main
    .aside-wrap(
      :class="{ down: !isMobile && scroll.change < 0 && scroll.pos > clientHeight }"
    )
      TheInfoCard(
        :icon="res.icon",
        :class="asideClasses",
        :style="asideStyles"
      )
      TheArchives(:articles="arch")
    .post
      .error(v-if="error") {{ error }}
      .post-item-wrap(
        v-for="(item, index) in articles",
        @mouseenter="itemActive = item.articleTitle",
        @mouseleave="itemActive = null"
      )
        PostItem(
          :key="index",
          :item="item",
          :to="`/archives/${item.articleId}`",
          :placeholder="res.placeholder",
          :data-aos="index % 2 == 0 ? 'fade-left' : 'fade-right'",
          :data-aos-once="isAosOnce"
        )
      .post-btn-next(
        v-if="page > 0",
        :class="{ 'post-btn-bottom': page < 0 }",
        @click="loadNext()"
      ) 
        span {{ page > 0 ? 'NEXT' : '已到底部' }}
    //- .aside-wrap
</template>

<script>
export default {
  data: () => ({
    page: null,
    articles: null,
    arch: null,
    error: null,
    itemActive: null,
    isAosOnce: false,
    // 侧栏
    asideStyles: {},
    asideClasses: {},
    asidePos: null
  }),
  watch: {
    itemActive(newVal, oldVal) {
      if (newVal) {
        this.$store.commit("live2dText", `要阅读『${newVal} 』吗?`);
      }
    }
  },
  computed: {
    scroll() {
      return this.$store.state.scroll;
    },
    isMobile() {
      return this.$store.getters.isMobile;
    },
    res() {
      const icon = `${this.$static}/icon/icon.png`;
      const placeholder = this.$statics.images.placeholder;
      return {
        icon,
        placeholder
      };
    },
    clientHeight() {
      // return document.body.clientHeight;

      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight =
          document.body.clientHeight < document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      } else {
        var clientHeight =
          document.body.clientHeight > document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      }
      return clientHeight;
    }
  },

  methods: {
    async loadNext() {
      if (this.page < 0) return;
      const resp = await this.$api.getArticlePage(++this.page, 8);
      if (resp.ok) {
        // 结尾
        if (resp.data.length === 0) {
          this.page = -1;
          return;
        }
        // this.articles.push(resp.data);
        this.articles = (this.articles || []).concat(resp.data);
      }
    }
  },
  async asyncData({ app, params }) {
    const page = params.post || 1;
    let articles = null;
    let arch = null;
    let error = null;
    try {
      const artRes = await app.$api.getArticlePage(page, 8);
      const archRes = await app.$api.getAllArticles();
      articles = artRes.ok ? artRes.data : [];
      arch = archRes.ok ? archRes.data : [];
    } catch (e) {
      error = "获取数据失败！";
      console.error(e);
    }
    return {
      page,
      articles,
      arch,
      error
    };
  },
  fetch() {
    this.$store.commit("header", { title: "雫『Shizuku』", isFull: true });
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
/**
 * position: sticly 粘性布局在 flex box 内应用需要给
 * 父元素设置 overflow: visible; 保证内容可滚动。
 * 该元素设置 align-self: flex-start；使其高度变为 auto 。
 * （由于flex box元素默认为stretch，因此所有元素都具有相同的高度，无法滚动。）
 * 最后设置 top, right, bottom, left 其中之一才能正常工作。
 */

#main {
  display: flex;
  overflow: visible;
}
.aside-wrap {
  position: sticky;
  top: 0;
  flex: 1;
  align-self: flex-start;
  padding: 1rem;
  transition: padding 0.8s;
  & > *:nth-child(2) {
    margin-top: 1rem;
  }
  &.down {
    // padding-top: 4.5rem;
  }
}
@media screen and (max-width: $mobile) {
  .aside-wrap {
    position: relative;
    align-self: stretch;
  }

  #main {
    flex-direction: column-reverse;
  }

  .post {
    flex: 1;
  }
}
.post {
  flex: 3;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

/** 下一页按钮样式 */
.post-btn-next {
  position: relative;
  align-self: center;
  width: 120px;
  line-height: 40px;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-weight: 500;
  color: var(--theme-primary);
  text-align: center;
  transition: color 0.2s ease;
  z-index: 0;
  cursor: pointer;
  font-family: InfoDisplay;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: var(--background);
    backdrop-filter: blur(10px);
    border: var(--theme-primary) solid 3px;
    transition: background 0.3s ease;
    z-index: -1;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    width: 0;
    height: 100%;
    background: var(--theme-primary);
    transition: width 0.3s ease;
    z-index: -1;
    margin: 0;
  }

  &:hover {
    &::after {
      width: 100%;
    }
    &::before {
      background: var(--theme-primary);
    }
    color: var(--white);
  }
}
</style>
