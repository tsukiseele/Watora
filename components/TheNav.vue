<template lang="pug">
.nav-wrap
  //- 仅滑到顶部时显示工具栏
  //- :class="{ 'nav-hide': scroll.change > 100 }"
  //- 'nav-hide': scroll.change > 0,
  nav#nav(:class="{ 'nav-hide': scroll.pos > 0, 'nav-bg': scroll.pos > 100 }")
    .nav-title(@click="$router.push('/')") {{ title }}
    .nav-spacer
    ul.nav-menu(v-if="!isMobile", :class="{ 'menu-dark': scroll.pos > 100 }")
      li(@click="$router.push('/')")
        SvgIcon(type="mdi", :path="icons.mdiHome") 
        .menu-title 主页
      li(@click="$router.push('/timeline')")
        SvgIcon(type="mdi", :path="icons.mdiViewList") 
        .menu-title 归档
      li(@click="$router.push('/friends')") 
        SvgIcon(type="mdi", :path="icons.mdiAt") 
        .menu-title 友链
      li(@click="$router.push('/about')")
        SvgIcon(type="mdi", :path="icons.mdiInformation") 
        .menu-title 关于
    .nav-spacer
    .nav-bars(v-if="isMobile", @click="drawer = !drawer")
      SvgIcon(type="mdi", :path="icons.mdiMenu") 
  .nav-drawer(v-if="isMobile", :class="{ open: drawer }")
    .drawer-blank(@click="drawer = !drawer")
    .drawer-main
      .drawer-banner 
      ul.drawer-menu(@click="drawer = !drawer")
        li(@click="$router.push('/')")
          SvgIcon(type="mdi", :path="icons.mdiHome") 
          .menu-title 主页
        li(@click="$router.push('/timeline')")
          SvgIcon(type="mdi", :path="icons.mdiViewList") 
          .menu-title 归档
        li(@click="$router.push('/friends')") 
          SvgIcon(type="mdi", :path="icons.mdiAt") 
          .menu-title 友链
        li(@click="$router.push('/about')")
          SvgIcon(type="mdi", :path="icons.mdiInformation") 
          .menu-title 关于
</template>

<script>
import { mdiHome, mdiViewList, mdiAt, mdiInformation, mdiMenu } from "@mdi/js";
export default {
  data: () => ({
    title: "雫『Watora』",
    drawer: false,
    icons: {
      mdiHome,
      mdiViewList,
      mdiAt,
      mdiInformation,
      mdiMenu,
    },
  }),
  computed: {
    scroll() {
      return this.$store.state.scroll;
    },
    isMobile() {
      return this.$store.getters.isMobile;
    },
  },
};
</script>
<style lang="scss">
.nav-wrap {
  position: relative;
}
#nav {
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  height: var(--nav-height);
  padding: 0 2rem;
  color: var(--text);
  background: transparent;
  transition: all 0.3s ease-in-out;
  user-select: none;
  z-index: 9;
  
  // backdrop-filter: blur(10px);
  
  &:hover {
    background: var(--background);
  }
  /*
  &.nav-hide {
    transform: translateY(-100%);
    opacity: 0;
  }*/

  &.nav-bg {
    color: var(--text);
    background-color: var(--white);
    box-shadow: var(--shadow);
  }
}

.nav-bars {
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background 0.3s ease;
  svg {
    transition: 0.3s ease;
  }
  &:hover {
    background-color: var(--card);
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
    height: 12rem;
    background-image: url(https://cdn.jsdelivr.net/gh/tsukiseele/ImageHosting/upload/826f66f94e3ebf1f62cff7c9109bb118.jpeg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .drawer-menu {
    color: var(--text);

    li {
      display: flex;
      transition: all 0.2s ease;
      cursor: pointer;
      padding: .67rem 0;
      align-items: center;

      &:hover {
        background-color: var(--theme-primary);
      }

      .menu-title {
        margin-top: 3px;
      }

      svg {
        transform: scale(0.9);
        margin: 0 1rem;
      }
    }
  }
  .drawer-blank {
    position: fixed;
    display: none;
    height: 100%;
    width: 100%;
    z-index: 99;
    transition: background 0.3s ease;
  }

  &.open {
    .drawer-main {
      right: 0%;
      box-shadow: var(--shadow);
    }
    .drawer-blank {
      display: block;
      background-color: rgba(0, 0, 0, 0.67);
    }
  }
}

.nav-title {
  font-size: 1.2rem;
  font-family: InfoDisplay;
  font-weight: 500;
  padding-right: 2rem;
  cursor: pointer;
  align-self: center;
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
    // border-radius: 0.33rem 0.33rem 0 0;
    padding: 0.25rem 1rem;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: var(--theme);
      background-color: var(--active-background);
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
      border-bottom: var(--theme) solid 2px;
      transition: width 0.2s ease-in-out;
    }
    .menu-title {
      margin-top: 3px;
      margin-left: .5rem;
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
</style>
