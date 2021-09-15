<template lang="pug">
.nav-wrap
  //- 仅滑到顶部时显示工具栏
  //- :class="{ 'nav-hide': scroll.change > 100 }"
  //- 'nav-hide': scroll.change > 0,
  nav#nav(:class="{ 'nav-hide': scroll.pos > 0, 'nav-bg': scroll.pos > 100 }")
    .nav-title(@click="$router.push('/')") {{ title }}
    .nav-spacer
    //- , :class="{ 'menu-dark': scroll.pos > 100 }"
    ul.nav-menu(v-if="!isMobile")
      li(v-for="(lk, i) in links", :key="i", @click="$router.push(lk.to)")
        i.material-icons {{ lk.icon }}
        .menu-title {{ lk.name }}
    .nav-spacer
    .nav-bars(v-if="isMobile", @click="drawer = !drawer")
      i.material-icons menu
  .nav-drawer(v-if="isMobile", :class="{ open: drawer }")
    .drawer-blank(@click="drawer = !drawer")
    .drawer-main
      .drawer-banner 
      ul.drawer-menu(@click="drawer = !drawer")
        li(
          v-for="(link, j) in links",
          :key="j",
          @click="$router.push(link.to)"
        )
          i.material-icons {{ link.icon }}
          .menu-title {{ link.name }}
</template>

<script>
import { mapState, mapGetters } from "vuex"
export default {
  data: () => ({
    title: "雫『Watora』",
    drawer: false,
    links: [
      {
        name: "主页",
        to: "/",
        icon: "home",
      },
      {
        name: "画廊",
        to: "/gallery",
        icon: "collections"
      },
      {
        name: "归档",
        to: "/timeline",
        icon: "bookmark",
      },
      {
        name: "友链",
        to: "/friends",
        icon: "link",
      },
      {
        name: "关于",
        to: "/about",
        icon: "info",
      },
    ],
  }),
  computed: {
    ...mapState(['scroll']),
    ...mapGetters(['isMobile'])
  },
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
