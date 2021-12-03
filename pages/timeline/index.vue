<template lang="pug">
#timeline
  TheBanner(:title='header.title', :subtitle='header.subtitle', :isFull='header.isFull', :isHide='header.isHide', :isHideSubtitle='header.isHideSubtitle')
  .timeline
    .timeline-group(v-for='(group, date) in timeline' :key="date")
      span.timeline-date {{ date }}
      div.timeline-list
        a.timeline-item(v-for='item in group' :key='item.id' :href="`/archives/${item.id}`" @click.prevent='$router.push(`/archives/${item.id}`)')
          span.timeline-day {{ item.createAt | formatDate('dd')}}
          span {{ item.title }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    header: {
      title: '归档',
      subtitle: '',
    },
    archives: [],
    error: null,
  }),
  fetch() {
    this.$store.commit('header', { title: '『时间线』' })
  },
  computed: {
    ...mapState(['timeline']),
  },
  mounted() {},
  async fetch({ store, params }) {
    await store.dispatch('timeline')
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
