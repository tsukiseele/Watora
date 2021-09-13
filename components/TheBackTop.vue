<template lang="pug">
img#back-top(v-if='!isMobile', ref='back', :src='img', :class='{ hide: scroll.pos < 500 }', @click='handleBackTop()', draggable='false', oncontextmenu='return false')
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data: () => ({
    img: 'https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/assets/back-top.png',
  }),
  computed: {
    ...mapState(['scroll']),
    ...mapGetters(['isMobile']),
  },
  methods: {
    handleBackTop() {
      document.getElementById('app').scrollIntoView()
    },
  },
}
</script>

<style lang="scss" scoped>
#back-top {
  position: fixed;
  right: 2rem;
  bottom: 33%;
  transition: bottom 0.3s ease;
  animation: float 3s linear infinite;
  cursor: pointer;
  z-index: 99;
  user-select: none;
  &.hide {
    bottom: 100%;
    animation: none;
  }
  @media screen and (max-width: $mobile) {
    display: none;
  }
}
@keyframes float {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
</style>
