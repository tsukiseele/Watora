import { formatPost, formatNavMenu } from '@/plugins/utils/format.js'

export const state = () => ({
  page: 0,
  clientWidth: 0,
  live2dText: '',
  scroll: {
    pos: 0,
    change: 0
  },
  archives: [],
  archive: {},
  menu: [],
  labels: [],
  categorys: [],
  header: {
    title: '',
    subtitle: '',
    isHideSubtitle: false,
    isFull: false,
    isHide: false
  }
})

export const getters = {
  live2dText(state) {
    return state.live2dText
  },
  scroll(state) {
    return state.scroll
  },
  header(state) {
    return state.header
  },
  clientWidth(state) {
    return state.clientWidth
  },
  isMobile(state) {
    return state.clientWidth < 960
  },
  archives(state) {
    return state.archives
  }
}

export const mutations = {
  page(state, page) {
    state.page = page
  },
  live2dText(state, msg) {
    state.live2dText = msg
  },
  scroll(state, scroll) {
    state.scroll = scroll
  },
  header(state, header) {
    state.header = header
  },
  clientWidth(state, clientWidth) {
    state.clientWidth = clientWidth
  },
  archives(state, archives) {
    state.archives = archives
  },
  archive(state, archive) {
    state.archive = archive
  },
  labels(state, labels) {
    state.labels = labels
  },
  categorys(state, categorys) {
    state.categorys = categorys
  }
}

export const actions = {
  async archives({ commit, state }, { page, count }) {
    if (state.page === page) return
    const archives = [];
    (await this.$service.getArchives(page, count)).forEach(item => {
      archives.push(formatPost(item))
    })
    commit('page', page)
    commit('archives', archives)
  },
  async archive({ commit, state }, { id }) {
    let archive = null
    // 先从缓存里面找
    if (state.archives) {
      archive = state.archives.find(item => Number(item.id) === id)
    }
    // 如果没有找到就请求
    commit('archive', archive || formatPost(await this.$service.getArchiveById(id)))
  },
  async labels({ commit }) {
    // 如果没有找到就请求
    commit('labels', await this.$service.getLabels())
  },
  async categorys({ commit }) {
    commit('categorys', await this.$service.getMilestones())
  }
}
