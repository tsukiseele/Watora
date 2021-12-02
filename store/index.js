import { formatPost, formatNavMenu, formatGallery, formatTimeline, formatPage } from '@/plugins/utils/format.js'

export const state = () => ({
  page: 0,
  clientWidth: 0,
  live2dText: '',
  scroll: {
    pos: 0,
    change: 0,
  },
  archives: [],
  archive: {},
  images: [],
  inspiration: [],
  about: {},
  menu: [],
  labels: [],
  categorys: [],
  friends: [],
  timeline: [],
  header: {
    title: '',
    subtitle: '',
    isHideSubtitle: false,
    isFull: false,
    isHide: false,
  },
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
  },
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
  },
  images(state, images) {
    state.images = images
  },
  inspiration(state, inspiration) {
    state.inspiration = inspiration
  },
  about(state, about) {
    state.about = about
  },
  friends(state, friends) {
    state.friends = friends
  },
  timeline(state, timeline) {
    state.timeline = timeline
  }
}

export const actions = {
  /**
   * 获取与
   * @param {Context} context 上下文
   * @param {Object} params 分页参数
   * @returns {Array<Archive>} 文章列表
   */
  async archives({ commit, state }, { page, count }) {
    if (state.page === page) return
    const archives = []
    ;(await this.$service.getArchives({ page, count })).forEach(item => {
      archives.push(formatPost(item))
    })
    commit('page', page)
    commit('archives', archives)
  },
  /**
   * 通过id获取文章
   * @param {Context} context 上下文
   * @param {Object} id 文章id
   */
  async archive({ commit, state }, { id }) {
    let archive = null
    // 先从缓存里面找
    if (state.archives) {
      archive = state.archives.find(item => item.id == id)
    }
    // 如果没有找到就请求
    commit('archive', archive || formatPost(await this.$service.getArchiveById(id)))
  },
  /**
   *
   * @param {*} param0
   * @returns
   */
  async images({ commit, state }) {
    if (state.images.length > 0) return
    let images = []
    ;(await this.$service.getArchives({ page: 1, count: 99 })).forEach(item => {
      images.push(...formatGallery(item))
    })
    images = images.slice(0, 20)
    commit('images', images)
  },
  /**
   * 获取时间线
   * @param {*} param0 
   * @returns 
   */
  async timeline({ commit, state }) {
    if (state.timeline.length) return
    const timeline = formatTimeline((await this.$service.getArchives({ page: 1, count: 99 })))
    commit('timeline', timeline)
  },
  /**
   * 获取标签列表
   * @param {Context} context 上下文
   */
  async labels({ commit }) {
    // 如果没有找到就请求
    commit('labels', await this.$service.getLabels())
  },
  /**
   * 获取分类列表
   * @param {Context} context 上下文
   */
  async categorys({ commit }) {
    commit('categorys', await this.$service.getMilestones())
  },
  /**
   *
   * @param {*} param0
   * @param {*} param1
   */
  async inspiration({ commit }, { page, count }) {
    commit('inspiration', formatInspiration(await this.$service.getInspiration({ page, count })))
  },
  /**
   * 获取关于
   * @param {*} param0
   */
  async about({ commit }) {
    const about = await this.$service.getPage('about')
    if (about && about[0]) {
      commit('about', formatPage(about[0], 'about'))
    }
  },
  /**
   * 获取友链
   */
  async friends({ commit }) {
    const friends = await this.$service.getPage('friend')
    if (friends && friends[0]) {
      commit('friends', formatPage(friends[0], 'friend'))
    }
  },
}
