export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '宿舍管理系统',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '宿舍管理系统,宿舍,管理系统,学生信息,学校管理,智慧校园' },
      { hid: 'description', name: 'description', content: '专业宿舍管理信息系统，可以更好的对查寝进行帮助！支持超级用户登录、邀请码邀请、信息保密！' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#409EFF', height: '3px' },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/router',
    '@/plugins/filters',
    '@/plugins/axios',
    '@/store/index',
    { src: '@/plugins/cryptoAES', ssr: false },
    { src: '@/plugins/token', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  productionSourceMap: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dayjs'
  ],
  dayjs: {
    locales: ['en', 'ja'],
    defaultLocale: 'en'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
    credential: true
  },
  proxy: {
    '/api/': {
      target: 'https://api.hzti.xyz',
      pathRewrite: { '^/api/': '' },
      changeOrigin: true
    }
  },
  router: {
    middleware: 'unknownRoute'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    // css链接式引入
    extractCSS: { allChunks: true }
  }
}
