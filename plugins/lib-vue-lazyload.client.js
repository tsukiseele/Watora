import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  // 预加载的宽高比，4:3
  preLoad: 1.33,
  // 加载失败后的图片
  error: 'https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/icon/icon-error.png',
  // 加载时的图片
  loading: 'https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/icon/loading.gif',
  // 重试次数
  attempt: 2
})
