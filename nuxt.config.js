export default {
  mode: "universal",
  server: {
    host: process.env.BASE_HOST || "localhost",
    port: process.env.BASE_PORT || 3000
  },
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
          "width=device-width,initial-scale=1.0,maximum-scale=1,minimum-scale=1,user-scalable=no"
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
  env: {
    SERVER_HOST: process.env.SERVER_HOST || "localhost",
    SERVER_PORT: process.env.SERVER_PORT || 80,
    BASE_URL: process.env.BASE_URL || "http://localhost:10737"
  },
  axios: {
    baseURL: process.env.BASE_URL || "http://localhost",
    retry: {
      retries: 3
    },
    credentials: true
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "ress",
    "~/styles/main.scss",
    "~/styles/transitions.scss",
    "~/styles/theme/light.scss",
    "~/styles/theme/dark.scss"
  ],

  // Global variables, mixins and function
  styleResources: {
    scss: ["~/styles/app/app.variables.scss", "~/styles/app/app.mixins.scss"]
  },

  // Plugins to run before rendering pasge: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/api.js",
    "~/plugins/utils.js",
    "~/plugins/filter.js",
    "~/plugins/inject.js",
    "~/plugins/ascii.client.js",
    "~/plugins/libs/lib-vue-lazyload.client.js",
    "~/plugins/libs/lib-vuex-persistedstate.client.js",
    "~/plugins/libs/lib-meditor.client.js",
    "~/plugins/libs/lib-aos.client.js",
    "~/plugins/libs/lib-svgicon.client.js",
    "~/plugins/libs/lib-live2d.client.js",
    "~/plugins/libs/lib-aplayer.client.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/style-resources"],

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
