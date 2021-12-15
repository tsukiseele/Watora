export default {
  // https://github.com/tsukiseele/blog.git
  server: {
    host: process.env.BASE_HOST || 'localhost',
    port: process.env.BASE_PORT || 3000,
  },
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Watora - TsukiSeele的个人小站',
    htmlAttrs: {
      lang: 'zh-CN',
    },
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0,maximum-scale=1,minimum-scale=1,user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.css',
      },
    ],
  },
  axios: {
    // baseURL: 'https://api.github.com/repos/chanshiyucx/blog',
    retry: {
      retries: 3,
    },
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ress', '~/styles/main.scss'],

  // Global variables, mixins and function
  styleResources: {
    scss: ['~/styles/app/app.variables.scss', '~/styles/app/app.mixins.scss'],
  },

  // Plugins to run before rendering pasge: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/config.js',
    '~/plugins/inject.js',
    '~/plugins/services.js',
    '~/plugins/utils/utils.js',
    '~/plugins/utils/filter.js',
    '~/plugins/utils/ascii.client.js',
    '~/plugins/utils/markdown-renderer.client.js',
    '~/plugins/libs/lib-vue-lazyload.client.js',
    '~/plugins/libs/lib-vuex-persistedstate.client.js',
    '~/plugins/libs/lib-aos.client.js',
    '~/plugins/libs/lib-live2d.client.js',
    '~/plugins/libs/lib-aplayer.client.js',
    '~/plugins/libs/lib-vssue.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-property-in-object', { loose: true }]],
    },
    extractCSS: {
      ignoreOrder: true,
    },
    // analyze: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
