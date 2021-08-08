export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Watora - TsukiSeele的个人小站",
    htmlAttrs: {
      lang: "zh-CN"
    },
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      },
      {
        hid: "description",
        name: "description",
        content: ""
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      // FontAwesome图标库
      {
        rel: "stylesheet",
        href:
          "//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      }
    ]
  },
  axios: {
    // 接口域名定义
    baseURL: process.env.BASE_URL || "http://localhost",
    // 请求重试次数
    retry: {
      retries: 3
    },
    // 证书
    credentials: true,
    // 启用代理
    proxy: true
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "ress",
    "~/assets/css/styles.scss",
    "~/assets/css/transitions.scss",
    "~/assets/css/theme/light.scss",
    "~/assets/css/theme/dark.scss"
  ],

  // Plugins to run before rendering pasge: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/api.js",
    "~/plugins/utils.js",
    "~/plugins/filter.js",
    "~/plugins/inject.js",
    "~/plugins/ascii.client.js",
    "~/plugins/lib-aos.client.js",
    "~/plugins/lib-vuex-persistedstate.client.js",
    "~/plugins/lib-mavon-editor.client.js",
    "~/plugins/lib-vue-lazyload.client.js",
    "~/plugins/lib-live2d.client.js",
    "~/plugins/lib-aplayer.client.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios"
    // '@nuxtjs/proxy'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-private-property-in-object", { loose: true }]
      ]
    },
    //extractCSS: { allChunks: true },
    //extractCSS: true,
    extractCSS: {
      ignoreOrder: true
    },
    // 开启打包分析
    /*
    analyze: true,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
    */
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
