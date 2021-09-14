<template lang="pug">
#container
  TheBanner(
    ref='banner',
    :title='header.title',
    :subtitle='header.subtitle',
    :isFull='header.isFull',
    :isHide='header.isHide',
    :isHideSubtitle='header.isHideSubtitle',
    :cover='$src.images.backgrounds[7]'
  )
  main#main
    .aside-wrap
      TheInfoCard(:icon='res.icon')
      .sticky
        SLabelClouds.card(:labels='labels')
        TheCategory(:categorys='categorys')
    .post
      .error(v-if='error') {{ error }}
      .post-item-wrap(v-for='(item, index) in archives', :key='index')
        SPostItem(
          :title='item.title',
          :cover='item.cover.url',
          :date='item.createAt',
          :labels='item.labels',
          :description='item.description',
          :to='`/archives/${item.id || ""}`',
          :placeholder='res.placeholder',
          :data-aos='index % 2 == 0 ? "fade-left" : "fade-right"',
          :data-aos-once='isAosOnce'
        )

      SPagination(:current='page', @change='onChange', :size='10', :loading='isLoading')
</template>

<script>
import { mapState } from 'vuex'

export default {
  scrollToTop: true,
  data: () => ({
    header: {
      title: 'WATORA',
    },
    arch: null,
    error: null,
    isLoading: false,
    itemActive: null,
    isAosOnce: true,
    _timer: null,
  }),
  mounted() {
    this.$nextTick(() => {
      this._timer = setTimeout(() => {
        this.$aos.refresh()
      })
    })
  },
  watch: {
    itemActive(newVal, oldVal) {
      if (newVal) {
        this.$store.commit('live2dText', `要阅读『${newVal} 』吗?`)
      }
    } /*
    $route: {
      handler(to, from) {
        if (process.client) {
          this.$nextTick(() => {
            setTimeout(() => {
              document
                .getElementById("container")
                .scrollIntoView({ behavior: "smooth" });
            }, 0);
          });
        }
      },
      deep: true,
      immediate: true,
    },*/,
  },
  computed: {
    ...mapState(['page', 'scroll', 'archives', 'labels', 'categorys']),
    isMobile() {
      return this.$store.getters.isMobile
    },
    res() {
      const icon = `${this.$static}/icon/icon.png`
      const placeholder = this.$src.images.placeholder
      return {
        icon,
        placeholder,
      }
    },
  },
  methods: {
    async onChange(page) {
      this.$router.push({ params: { page } })
    }
  },
  async fetch({ store, params }) {
    await Promise.all([
      store.dispatch('archives', {
        page: Number(params.page || 1),
        count: 10,
      }),
      store.dispatch('labels'),
      store.dispatch('categorys'),
    ])
  },
  beforeDestroy() {
    clearTimeout(this._timer)
  },
}
</script>

<style lang="scss" scoped>
@import '_page.scss';
</style>
