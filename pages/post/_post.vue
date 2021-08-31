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
      TheArchives(:archives="arch")
    .post
      .error(v-if="error") {{ error }}
      .post-item-wrap(v-for="(item, index) in archives")
        SPostItem(
          :key="index",
          :item="item",
          :to="`/archives/${item.number || ''}`",
          :placeholder="res.placeholder",
          :data-aos="index % 2 == 0 ? 'fade-left' : 'fade-right'",
          :data-aos-once="isAosOnce"
        )
      SPagination(
        v-model="page",
        @change="onChange",
        :size="10",
        :loading="isLoading"
      )
</template>

<script>
export default {
  data: () => ({
    page: 1,
    // archives: null,
    arch: null,
    error: null,
    isLoading: false,
    itemActive: null,
    isAosOnce: false,
    // 侧栏
    asideStyles: {},
    asideClasses: {},
    asidePos: null,
  }),
  watch: {
    itemActive(newVal, oldVal) {
      if (newVal) {
        this.$store.commit("live2dText", `要阅读『${newVal} 』吗?`);
      }
    },
  },
  computed: {
    scroll() {
      return this.$store.state.scroll;
    },
    isMobile() {
      return this.$store.getters.isMobile;
    },
    archives() {
      return this.$store.state.archives;
    },
    res() {
      const icon = `${this.$static}/icon/icon.png`;
      const placeholder = this.$statics.images.placeholder;
      return {
        icon,
        placeholder,
      };
    },
    clientHeight() {
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
    },
  },

  methods: {
    async onChange(page) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("archives", { page, count: 10 });
        if (this.archives && this.archives.length) {
          document
            .getElementById("container")
            .scrollIntoView({ behavior: "smooth" });
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async fetch() {
    this.$store.commit("header", { title: "雫『Shizuku』", isFull: true });

    await this.$store.dispatch("archives", { page: 1, count: 10 });
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
// @import "_post.scss";
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

  .loading {
    position: absolute;
    &::before {
      content: "";
    }
  }

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
