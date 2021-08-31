import { formatPost } from "@/plugins/format.js";

export const state = () => ({
  user: null,
  clientWidth: 0,
  live2dText: "",
  scroll: {
    pos: 0,
    change: 0
  },
  archives: [],
  archive: {},
  header: {
    title: "",
    subtitle: "",
    isHideSubtitle: false,
    isFull: false,
    isHide: false
  }
});

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
  },
  archives(state) {
    return state.archives;
  }
};

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
    state.clientWidth = clientWidth;
  },
  archives(state, archives) {
    state.archives = archives;
  },
  archive(state, archive) {
    state.archive = archive;
  }
};

export const actions = {
  async archives({ commit }, { page, count }) {
    const archives = [];
    const resp = await this.$service.getArchives(page, count);
    resp.forEach(item => {
      archives.push(formatPost(item));
    });
    commit("archives", archives);
  },
  async archive({ commit }, { id }) {
    commit("archive", formatPost(await this.$service.getArchiveById(id)));
  }
};
