<template lang="pug">
#container
  TheBanner(
    title="友链",
    subtitle="",
  )
  main#main
    ul.friends
      li.friend(v-for='(friend, index) in friends' :key='index' @click="onLinkClick(friend)" :style="{ '--cover' : `url(${friend.cover})` }")
        img.friend-avatar(:src='friend.avatar')
        span.friend-name {{ friend.name }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['friends']),
  },
  async fetch({ store, params }) {
    await store.dispatch('friends')
  },
  methods: {
    onLinkClick(friend) {
      window.open(friend.link, '_blank')
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
