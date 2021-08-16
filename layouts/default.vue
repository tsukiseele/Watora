<template lang="pug">
#app
  #background(:style="{ 'background-image': background }")
  TheNav
  TheHeader(
    :title="header.title",
    :subtitle="header.subtitle",
    :isFull="header.isFull",
    :isHide="header.isHide",
    :isHideSubtitle="header.isHideSubtitle"
  )
  main
    Nuxt

  //- 页脚
  TheFooter
  //- 播放器
  TheAPlayer(:musics="musics")
  //- Live2d，仅PC端
  TheLive2d(v-if="!isMobile", ref="live2d")
  //- 返回顶部
  TheBackTop
</template>

<script>
export default {
  data: () => ({
    playlistId: 6760099512,
    musics: [],
    windowWidth: 0
  }),
  computed: {
    background() {
      // 判断客户端，防止重复渲染；
      if (process.client) {
        return `url(${this.$static}/bg/${this.getRandomNumber(1, 20)}.webp)`;
      }
    },
    isMobile() {
      return this.$store.getters.isMobile;
    },
    header() {
      return this.$store.state.header;
    },
    live2dText() {
      return this.$store.state.live2dText;
    }
  },
  watch: {
    live2dText(newVal) {
      if (this.$refs.live2d) this.$refs.live2d.showMessage(newVal);
    },
    windowWidth(newVal) {
      this.$store.commit("clientWidth", newVal);
    }
  },
  methods: {
    /**
     * 获取播放列表
     */
    async getMusicList(url) {
      try {
        let result = await this.$axios.$get(url);
        if (result.code == 200) {
          const musics = [];
          for (const music of result.playlist.tracks) {
            musics.push({
              name: music.name,
              artist: music.ar[0].name,
              cover: music.al.picUrl,
              url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
            });
          }
          return musics;
        }
      } catch (e) {}
      return undefined;
    },
    async initMusicList() {
      /** 歌曲API列表 */
      // 文档参见：https://api.imjad.cn/cloudmusic.md
      const apis = [
        // `http://www.hjmin.com/playlist/detail?id=${this.playlistId}`,
        `https://api.imjad.cn/cloudmusic/?type=playlist&id=${this.playlistId}`
      ];
      for (const api of apis) {
        const result = await this.getMusicList(api);
        if (result) {
          return (this.musics = result);
        }
      }
    },
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    handleScroll() {
      const newPos =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const scroll = this.$store.getters.scroll;
      this.$store.commit("scroll", {
        pos: newPos,
        change: scroll && scroll.pos ? newPos - scroll.pos : 0
      });
    },
    handleResize() {
      if (document) {
        this.windowWidth = document.body.clientWidth;
      }
    },
    // 夜晚改变主题
    changeTheme() {
      if (this.$isNight()) {
        document.getElementsByTagName("html")[0].setAttribute("theme", "dark");
      }
    }
  },
  beforeMount() {
    this.changeTheme();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    this.initMusicList();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: $mobile) {
  #app {
    overflow-x: hidden;
  }
}
#app {
  position: relative;
  background: var(--background);
}
#background {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  object-fit: cover;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  transition: background 1s;
  overflow: hidden;
}
</style>
