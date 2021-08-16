<template lang="pug">
header#header(ref="header", :class="{ full: isFull, hide: isHide }", :style="{ '--hideTri': `${isFull ? 'block' : 'none'}` }")
  .header--card(v-show="!isHide")
    .header--title(@click="scrollToContent()")
      span {{ title }}
    .header--subtitle(v-if="!isHideSubtitle")
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
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    isHideSubtitle: {
      type: Boolean,
      default: false
    },
    isFull: {
      type: Boolean,
      default: false
    },
    isHide: {
      type: Boolean,
      default: false
    }
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
      vague: true
    }
  }),
  methods: {
    scrollToContent() {
      this.$nextTick(() => {
        const ele = document.getElementById("container");
        this.$store.commit("scroll", {
          pos: ele.offsetTop,
          change: ele.offsetTop
        });
        ele.scrollIntoView();
      });
    },
    typing() {
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
          `出自 ${hitokoto.from}`
        ].concat(this.input.template);
      }
      this.typing();
    }
  },
  computed: {
    clientHeight() {
      /*
      if(document) { 
      if (!document || process.env.server) return 0;
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
      } else {
        return 0;
      }*/
    },
    scroll() {
      return this.$store.state.scroll;
    }
  },
  watch: {
    scroll() {}
  },
  mounted() {
    if (!this.hideSubtitle) {
      if (this.subtitle && this.subtitle != "") {
        this.input.template = this.subtitle;
        this.typing();
      } else {
        this.getHitokoto();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33vh;
  width: 100%;
  background-color: var(--header);
  overflow: hidden;
  transition: all 0.3s ease;

  &.full {
    height: 100vh;
    background-color: transparent;
  }

  &.hide {
    height: 3rem;
  }

  @media screen and(max-width: $mobile) {
    height: 33vh;
  }
}

.header--card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  text-align: center;
  color: var(--text);
  font-family: InfoDisplay;

  .header--title {
    font-size: 2.2rem;
    font-weight: 500;
    cursor: pointer;
    text-shadow: 0 0 0.5rem var(--shadow);
    span {
      transition: color 0.3s ease;
    }
    :hover {
      color: var(--text);
    }
  }

  .header--subtitle {
    font-size: 1.4rem;
    cursor: pointer;
    .subtitle--cursor {
      height: 100%;
      border-left: white solid 1px;
      margin-left: 0.2rem;
    }
    .subtitle--cursor-vague {
      animation: cursor-vague 1s ease infinite;
    }
  }
  @media screen and (max-width: 768px) {
    .header--title {
      font-size: 1.8rem;
    }
    .header--subtitle {
      font-size: 1.2rem;
    }
  }
}
.btn-scroll {
  position: absolute;
  display: block;
  bottom: 0;
  // background-color: #fff;
  height: 50px;
  width: 50px;
  color: white;
  cursor: pointer;
  animation: float 3s linear infinite;
  z-index: 1;
}

@keyframes cursor-vague {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes float {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-10px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
</style>
