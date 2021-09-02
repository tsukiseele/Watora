<template lang="pug">
#container
  TheBanner(
    ref="banner",
    :title="header.title",
    :subtitle="header.subtitle",
    :isFull="header.isFull",
    :isHide="header.isHide",
    :isHideSubtitle="header.isHideSubtitle"
  )
  main#main
    .aside-wrap(
      :class="{ down: !isMobile && /*scroll.change < 0 && */ scroll.pos > bannerHeight() }"
    )
      TheInfoCard(
        :icon="res.icon",
        :class="asideClasses",
        :style="asideStyles"
      )
      .sticky
        SLabelClouds.card(:labels="labels")
        TheArchives(:archives="arch")
    .post
      .error(v-if="error") {{ error }}
      .post-item-wrap(v-for="(item, index) in archives")
        SPostItem(
          :key="index",
          :title="item.title",
          :cover="item.cover",
          :date="item.createAt",
          :labels="item.labels",
          :description="item.description",
          :to="`/archives/${item.id || ''}`",
          :placeholder="res.placeholder",
          :data-aos="index % 2 == 0 ? 'fade-left' : 'fade-right'",
          :data-aos-once="isAosOnce"
        )
      SPagination(
        :current="page",
        @change="onChange",
        :size="10",
        :loading="isLoading"
      )
</template>

<script>
import { mapState } from "vuex";

export default {
  scrollToTop: true,
  data: () => ({
    header: {
      title: "雫『Shizuku』",
    },
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
    }, /*
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
    },*/
  },
  computed: {
    ...mapState(["page", "scroll", "archives", "labels"]),
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
  },
  methods: {
    async onChange(page) {
      this.$router.push({ params: { page } });
    },
    bannerHeight() {
      if (process.client) {
        const banner = document.getElementById("banner");
        if (banner) {
          return banner.offsetHeight;
        }
        return NaN;
      }
    },
  },
  async fetch({ store, params }) {
    await Promise.all([
      store.dispatch("archives", {
        page: Number(params.page || 1),
        count: 10,
      }),
      store.dispatch("labels"),
    ]);
  },
};
</script>

<style lang="scss" scoped>
@import "_page.scss";
</style>
