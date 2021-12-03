<template lang="pug">
#back
  #app
    //- #background(:style="{ 'background-image': background }")
    TheNav
    main
      Nuxt
    //- 页脚
    TheFooter
    //- 播放器
    //- TheAPlayer(:musics="musics")
    //- Live2d，仅PC端
    //- TheLive2d(v-if="!isMobile", ref="live2d")
    //- 返回顶部
    TheBackTop
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data: () => ({
    playlistId: 6760099512,
    musics: [],
    windowWidth: 0,
  }),
  computed: {
    ...mapState(['header', 'live2dText']),
    ...mapGetters(['isMobile']),
    background() {
      // 判断客户端，防止重复渲染；
      if (process.client) {
        return `url(${this.$static}/bg/${this.getRandomNumber(1, 20)}.webp)`
      }
    },
  },
  watch: {
    live2dText(newVal) {
      if (this.$refs.live2d) this.$refs.live2d.showMessage(newVal)
    },
    windowWidth(newVal) {
      this.$store.commit('clientWidth', newVal)
    },
  },
  methods: {
    /**
     * 获取播放列表
     */
    async getMusicList(url) {
      try {
        const result = await this.$axios.$get(url)
        if (result.code == 200) {
          const musics = []
          for (const music of result.playlist.tracks) {
            musics.push({
              name: music.name,
              artist: music.ar[0].name,
              cover: music.al.picUrl,
              url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`,
            })
          }
          return musics
        }
      } catch (e) {}
      return undefined
    },
    async initMusicList() {
      /** 歌曲API列表 */
      // 文档参见：https://api.imjad.cn/cloudmusic.md
      const apis = [
        // `http://www.hjmin.com/playlist/detail?id=${this.playlistId}`,
        `https://api.imjad.cn/cloudmusic/?type=playlist&id=${this.playlistId}`,
      ]
      for (const api of apis) {
        const result = await this.getMusicList(api)
        if (result) {
          return (this.musics = result)
        }
      }
    },
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    handleScroll() {
      const newPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const scroll = this.$store.getters.scroll
      this.$store.commit('scroll', {
        pos: newPos,
        change: scroll && scroll.pos ? newPos - scroll.pos : 0,
      })
    },
    handleResize() {
      if (document) {
        this.windowWidth = document.documentElement.clientWidth
      }
    },
    // 夜晚改变主题
    changeTheme() {
      if (this.$isNight()) {
        // document.getElementsByTagName("html")[0].setAttribute("theme", "dark");
      }
    },
  },
  beforeMount() {
    this.changeTheme()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    // this.initMusicList();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

<style lang="scss">
#back {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url('/bg.webp');
    background-size: cover;
    // background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.5) 1rem, transparent 1rem 2rem, rgba(255, 255, 255, 0.5) 2rem 3rem);
    // background-color: #8491c3; //#ffec47;
    // background-image: url(https://api.paugram.com/wallpaper?source=gt);
    // background-color: red;
    background-position: center;
    background-attachment: fixed;
  }
  /*
  background-image: repeating-linear-gradient(
    45deg,
    #ccc 2px,
    transparent 2px 4px,
    #ccc 4px 6px,
    transparent 6px 8px
  );*/
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: $mobile) {
  #app {
    overflow-x: hidden;
  }
}

#app {
  position: relative;
  // background: var(--background);
  background-color: white;
  width: 1080px;
  // width: $mobile;
  margin: 0 auto;
  box-shadow: var(--shadow);

  @media screen and (max-width: 1080px) {
    width: $mobile;
  }
  @media screen and (max-width: $mobile) {
    width: 100%;
  }
}
#background {
  position: fixed;
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

main {
  // position: absolute;
  // background: #445;
}
@keyframes identifier {
  100% {
    transform: translate(100%, 100%);
  }
}
</style>
