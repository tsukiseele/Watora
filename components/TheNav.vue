<template lang="pug">
.nav-wrap
  //- 仅滑到顶部时显示工具栏
  //- :class="{ 'nav-hide': scroll.change > 100 }"
  nav#nav(
    :class="{ 'nav-hide': scroll.change > 0, 'nav-bg': scroll.pos > 100 }"
  )
    .nav-title(@click="$router.push('/')") {{ title }}
    .nav-spacer
    ul.nav-menu(v-if="!isMobile", :class="{ 'menu-dark': scroll.pos > 100 }")
      li(@click="$router.push('/')")
        i.fa.fa-home 
        | 主页
      li(@click="$router.push('/timeline')")
        i.fa.fa-list 
        | 归档
      li(@click="$router.push('/friends')") 
        i.fa.fa-at 
        | 友链
      li(@click="$router.push('/about')")
        i.fa.fa-info 
        | 关于我
    .nav-spacer
    .nav-bars(v-if="isMobile" @click="drawer = !drawer")
      i.fa.fa-bars
  .nav-drawer(v-if="isMobile" :class="{ open: drawer }")
    .drawer-blank(@click="drawer = !drawer")
    .drawer-main
      .drawer-banner 
      ul.drawer-menu(@click="drawer = !drawer")
        li(@click="$router.push('/')")
          i.fa.fa-home 
          | 主页
        li(@click="$router.push('/timeline')")
          i.fa.fa-list 
          | 归档
        li(@click="$router.push('/links')") 
          i.fa.fa-at 
          | 友链
        li(@click="$router.push('/about')")
          i.fa.fa-info 
          | 关于我
</template>

<script>
export default {
  data: () => ({
    title: "雫『Watora』",
    drawer: false
  }),
  computed: {
    scroll() {
      return this.$store.state.scroll;
    },
    isMobile() {
      return this.$store.getters.isMobile;
    }
  }
};
</script>
<style lang="scss">
.nav-wrap {
  position: relative;
}
#nav {
  position: fixed;
  top: 0;
  display: flex;
  color: var(--theme);
  width: 100%;
  padding: 0 2rem;
  background: transparent;
  transition: all 0.3s linear;
  z-index: 9;
  line-height: 3rem;
  align-items: center;

  &:hover {
    background: var(--background);
  }

  &.nav-hide {
    transform: translateY(-100%);
  }

  &.nav-bg {
    color: var(--text);
    background: var(--card);
    box-shadow: 0 1px 6px var(--shadow);
  }
}

.nav-bars {
  align-self: center;
  display: flex;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background 0.3s ease;
  i {
    align-self: center;
    font-size: 1.3rem;
    padding: 0.5rem;
    transition: 0.3s ease;
  }
  &:hover {
    background-color: var(--shadow);
  }
}

.nav-drawer {
  .drawer-main {
    position: fixed;
    right: -60%;
    width: 60%;
    height: 100%;
    transition: right 0.3s ease;
    background-color: var(--card);
    z-index: 100;
  }

  .drawer-banner {
    height: 10rem;
    background-image: url(https://cdn.jsdelivr.net/gh/tsukiseele/ImageHosting/upload/826f66f94e3ebf1f62cff7c9109bb118.jpeg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .drawer-menu {
    color: var(--text);

    li {
      i {
        padding-right: 0.5rem;
      }
      cursor: pointer;
      padding: 0.5rem 1rem;
      transition: all 0.2s ease;

      &:hover {
        background-color: var(--theme-primary);
        filter: brightness(1.2);
      }
    }
  }
  .drawer-blank {
    position: fixed;
    display: none;
    height: 100%;
    width: 100%;
    // top: 0;
    // right: -100%;
    z-index: 99;
    transition: background 0.3s ease;
  }

  &.open {
    .drawer-main {
      right: 0%;
      box-shadow: 0 -3px 6px var(--shadow);
    }
    .drawer-blank {
      display: block;
      background-color: rgba(0, 0, 0, 0.67);
    }
  }

  /*
  .drawer-blank {

    transition: 0.3s ease;
    // background-color: var(--shadow);
  }*/
}

.nav-title {
  font-size: 1.2rem;
  font-family: InfoDisplay;
  font-weight: 500;
  padding-right: 2rem;
  cursor: pointer;
}

.nav-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    // line-height: 3rem;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.33rem 0.33rem 0 0;
    padding: 0.25rem 1rem;
    height: 100%;
    cursor: pointer;
    transition: background 0.2s ease-in-out;

    &:hover {
      background: var(--shadow);
      &::after {
        width: 100%;
        left: 0;
      }
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0;
      border-bottom: var(--theme-primary) solid 2px;
      transition: width 0.2s ease-in-out;
    }
    i {
      padding-right: 0.33rem;
      font-size: 1.1rem;
    }
  }
  &.menu-dark li {
    &:hover {
      background: var(--theme-primary);
    }
    &::after {
      border-bottom: var(--black) solid 2px;
    }
  }
}

.nav-spacer {
  flex-grow: 1;
}
/*
@media screen and (max-width: 768px) {
  .nav-title {
    display: none;
  }
}*/
</style>
