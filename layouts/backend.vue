<template lang="pug">
#app
  .header 
    span.header-icon Watora
    span.header-title 博客管理系统
  #root
    aside#aside
      ul.menu
        ol.menu-item(   
          v-for="(item, index) in menu",
          :key="index",
          @click="handleItemClick(item)"
        )
          i.menu-item-icon(:class="['fa', item.icon]") 
          span.menu-item-title {{ item.title }}
    main#wrap
      Nuxt
</template>

<script>
export default {
  middleware: "auth",
  data: () => ({
    menu: [
      {
        title: "仪表盘",
        icon: "fa-dashboard",
        to: "/admin"
      },
      {
        title: "新想法",
        icon: "fa-pencil",
        to: "/admin/edit"
      },
      {
        title: "文章管理",
        icon: "fa-file-text-o",
        to: "/admin/manager"
      },
      {
        title: "评论管理",
        icon: "fa-comment-o",
        to: "/admin/comment"
      },
      {
        title: "友链管理",
        icon: "fa-at",
        to: "/admin/link"
      },
      {
        title: "返回主页",
        icon: "fa-reply",
        to: "/"
      }
    ]
  }),
  methods: {
    handleItemClick(item) {
      this.$router.push(item.to);
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
#root {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

#aside {
  min-width: 200px;
  min-height: 100%;
  border-right: 1px solid var(--border);
}

#wrap {
  flex-grow: 1;
  margin: 1rem;
}

.header {
  background-color: var(--theme);
  line-height: 4rem;
  padding-left: 1rem;
  box-shadow: 0 0 5px var(--theme);
  z-index: 2;
  .header-icon {
    font-family: InfoDisplay;
    font-weight: bold;
    font-size: 1.5rem;
    padding: 0 0.33rem;
    color: var(--text);
  }
  .header-title {
    color: var(--text);
    font-size: 1.1rem;
  }
}

.menu {
  .menu-item {
    padding: 1rem;
    border-bottom: 1px solid var(--border);
    transition: filter 0.3s ease;
    background: var(--card);
    cursor: pointer;
    &:hover {
      filter: brightness(0.9);
    }
    .menu-item-icon {
      padding-right: 0.5rem;
    }
    .menu-item-title {
    }
  }
}
</style>
