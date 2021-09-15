<template lang="pug">
#banner(
  ref="banner",
  :class="{ full: isFull, hide: isHide }",
  :style="{ 'background-image': cover ? `url(${cover})` : null }"
)
  .banner--card(v-show="!isHide")
    .banner--title(@click="scrollToContent()")
      span {{ title }}
    .banner--subtitle(v-if="!isHideSubtitle")
      span {{ input.show }}
      span.subtitle--cursor(:class="{ 'subtitle--cursor-vague': input.vague }")
  .btn-scroll(v-show="!isHide && isFull")
    i.fa.fa-chevron-down.fa-lg(@click="scrollToContent()")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    cover: {
      type: String,
      default: null,
    },
    isHideSubtitle: {
      type: Boolean,
      default: false,
    },
    isFull: {
      type: Boolean,
      default: false,
    },
    isHide: {
      type: Boolean,
      default: false,
    },
    disableTyping: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    input: {
      template: [
        /*
        "明日から、幸せな人になろう。",
        "馬を飼って、薪を割って、世界を旅して。",
        "明日から、食糧と野菜に気を使ってみよう。",
        "私の家は、春に花咲く、この海辺に。",
        "明日から、親しい人には手紙を書いて、",
        "彼らに私の幸福を教えてあげよう。",
        "あの稲妻のような幸福が、教えてくれたことを、",
        "全ての人に教えて、",
        "全ての川と山に、一つずつ暖かい名を付けて。",
        "見知らぬ人、私はあなたのためにも祝福しよう。",
        "あなたに素晴らしい未来があることを、",
        "あなたとあなたの恋人が結ばれることを、",
        "あなたがこの平凡な世界で幸せになる事を、願って。",
        "そして私はただ、春に花咲く、この海辺に。",*/
      ],
      show: "", // 当前行内容
      index: 0, // 行索引
      state: true,
      vague: true,
    },
  }),
  methods: {
    scrollToContent() {
      this.$nextTick(() => {
        const ele = document.getElementById("container");
        this.$store.commit("scroll", {
          pos: ele.offsetTop,
          change: ele.offsetTop,
        });
        ele.scrollIntoView();
      });
    },
    typing() {
      if (this.disableTyping) return;
      let sleep = 0;
      // 输入时，去除光标闪烁
      if (this.input.vague) this.input.vague = false;
      // 开始输入
      let currentLine = this.input.template[this.input.index];
      if (this.input.state) {
        this.input.show = currentLine.substring(0, this.input.show.length + 1);
        sleep = 180;
        // 删除
      } else {
        this.input.show = currentLine.substring(0, this.input.show.length - 1);
        sleep = 50;
      }
      // 输入前后调用,反转状态
      if (
        this.input.show.length == 0 ||
        this.input.show.length == currentLine.length
      ) {
        this.input.state = !this.input.state;
      }
      // 开始输入前调用
      if (this.input.show.length == 0) {
        this.input.index =
          ++this.input.index < this.input.template.length
            ? this.input.index
            : 0;
        this.input.vague = true;
        sleep = 666;
      }
      // 输入完毕后调用
      if (this.input.show.length == currentLine.length) {
        this.input.vague = true;
        sleep = 2000;
      }
      setTimeout(this.typing, sleep);
    },
    async getHitokoto() {
      let hitokoto = await this.$axios.$get("https://v1.hitokoto.cn/");
      if (hitokoto) {
        this.input.template = [
          `${hitokoto.hitokoto}`,
          `出自 ${hitokoto.from}`,
        ].concat(this.input.template);
      }
      this.typing();
    },
  },
  computed: {
    scroll() {
      return this.$store.state.scroll;
    },
  },
  watch: {
    scroll() {},
  },
  mounted() {
    if (!this.hideSubtitle) {
      if (this.subtitle) {
        this.input.template =
          typeof this.subtitle === "string" ? [this.subtitle] : this.subtitle;
        this.typing();
      } else {
        this.getHitokoto();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
