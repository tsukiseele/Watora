export const state = () => ({
  user: null,
  clientWidth: 0,
  live2dText: "",
  scroll: {
    pos: 0,
    change: 0
  },
  header: {
    title: "",
    subtitle: "",
    isHideSubtitle: false,
    isFull: false,
    isHide: false,
  }
})

export const getters = {
  user(state) {
    return state.user;
  },
  live2dText(state) {
    return state.live2dText;
  },
  scroll(state) {
    return state.scroll;
  },
  header(state) {
    return state.header;
  },
  clientWidth(state) {
    return state.clientWidth;
  },
  isMobile(state) {
    return state.clientWidth < 768;
  }
}

export const mutations = {
  user(state, user) {
    state.user = user;
  },
  live2dText(state, msg) {
    state.live2dText = msg;
  },
  scroll(state, scroll) {
    state.scroll = scroll;
  },
  header(state, header) {
    state.header = header;
  },
  clientWidth(state, clientWidth) {
    state.clientWidth = clientWidth
  }
}
