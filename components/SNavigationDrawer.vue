<template lang="pug">
.navigation-drawer-wrap
  .navigation-drawer.card(
    :style="{ width: typeof width === 'string' ? width : `${width}px` }"
  )
    ul.nav-menu
      li.nav-item(
        v-for="(item, index) in menu",
        :key="index",
        @click="$router.push(item.to)"
      )
        SvgIcon.icon(type="mdi", :path="item.icon")
        span {{ item.title }}
        ul.nav-submenu(v-if="submenu")
          li.nav-subitem(v-for="(subitem, i) in submenu", :key="i")
            SvgIcon(type="mdi", :path="subitem.icon")
            span {{ subitem.title }}
  .contain
    slot
</template>

<script>
export default {
  props: {
    width: {
      type: String | Number,
      default: 200,
    },
    menu: {},
  },
  data: () => ({}),
  methods: {},
};
</script>

<style lang="scss" scoped>
.navigation-drawer-wrap {
  display: flex;
  align-items: flex-start;
  margin: 1rem;
  .minilize {
    display: flex;
  }
  .navigation-drawer {
    flex: 0 0 200px;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    // width: 200px;
    .nav-menu {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      .nav-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        line-height: 3rem;
        padding-left: 1rem;
        transition: 0.25s ease;
        &:hover {
          color: white;
          background-color: var(--theme);
        }
        .icon {
          max-width: 1.2rem;
          margin-right: .5rem;
        }
      }
    }
  }
  .contain {
    flex: 1;
    margin-left: 1rem;
  }
}
</style>