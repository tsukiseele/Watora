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
@import "./_post.scss";
</style>
