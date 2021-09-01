<template lang="pug">
#container
  TheBanner(
    :title="header.title",
    :subtitle="header.subtitle",
    :isFull="header.isFull",
    :isHide="header.isHide",
    :isHideSubtitle="header.isHideSubtitle"
  )
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
          :title="item.title",
          :cover="item.cover"
          :date="item.createAt"
          :description="item.description"
          :to="`/archives/${item.id || ''}`",
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
import { mapState } from 'vuex'

export default {
  scrollToTop: true,
  data: () => ({
    page: 1,
    arch: null,
    error: null,
    isLoading: false,
    itemActive: null,
    isAosOnce: true,
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
    } /*
    $route: {
      handler(to, from) {
        if (process.client) {
          this.$nextTick(() => {
            setTimeout(() => {
              document
                .getElementById("container")
                .scrollIntoView({ behavior: "smooth" });
            }, 0);
          });
        }
      },
      deep: true,
      immediate: true,
    },*/,
  },
  computed: {
    ...mapState([
      'header',
      'scroll',
      'archives'
    ]),
    isMobile() {
      return this.$store.getters.isMobile;
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
      return document.body.clientHeight;
    },
  },
  methods: {
    async onChange(page) {
      this.$router.push({ params: { page } });
    },
  },
  asyncData({ params }) {
    return { page: Number(params.page || 1) };
  },
  async fetch({ store, params }) {
    store.commit("header", { title: "雫『Shizuku』", isFull: true });
    await store.dispatch("archives", {
      page: Number(params.page || 1),
      count: 10,
    });
  },
};
</script>

<style lang="scss" scoped>
@import "_page.scss";
</style>
