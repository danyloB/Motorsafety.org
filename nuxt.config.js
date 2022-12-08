// import routes from './utils/staticRoutes/generatedRoutes'
import { resolveRoutes } from './modules/content.js'

const modifyHtml = (html) => {
  // Add amp-custom tag to added CSS
  html = html.replace(/<style data-vue-ssr/g, '<style amp-custom data-vue-ssr')
  // Remove every script tag from generated HTML
  // html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  // Add AMP script before </head>
  const ampScript =
    '<script async src="https://cdn.ampproject.org/v0.js"></script>'
  html = html.replace('</head>', ampScript + '</head>')
  return html
}

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  // ssr: false,
  dev: true,
  devtools: true,
  target: 'static',

  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'MotorSafety.org',
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Protecting Drivers Everywhere'
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'MotorSafety.org'
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'MotorSafety.org'
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'MotorSafety.org'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Protecting Drivers Everywhere'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://www.motorsafety.org'
      },
      {
        rel: 'preconnect',
        href: 'https://cognito-identity.us-west-2.amazonaws.com'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/app.scss',
    'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css',
    // 'owl.carousel/dist/assets/owl.carousel.css',
    // 'owl.carousel/dist/assets/owl.theme.default.css',
    'vue-select/dist/vue-select.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: '@/plugins/client',
      mode: 'client'
    },
    {
      src: '@/plugins/amplify.js',
      mode: 'client'
    },
    { src: '@/plugins/appsync.js' },
    '@/plugins/maps',
    '@/plugins/components',
    '@/plugins/cloudinary',
    '@/plugins/vuelidate',
    '@/plugins/jsonld',
    'plugins/preview.client.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@/modules/sitemapRouteGenerator',
    '@/modules/content'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'nuxt-fontawesome',
    '@nuxtjs/svg',
    '@nuxtjs/sitemap',
    '@nuxt/content'
  ],
  bootstrapVue: {
    // components: [
    //   'BForm',
    //   'BRow',
    //   'BCol',
    //   'BFormInput',
    //   'BButton',
    //   'BTable',
    //   'BModal'
    // ],
    // bootstrapCSS: false, // Or `css: false`
    // bootstrapVueCSS: false // Or `bvCSS: false`
  },

  middleware: [],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend (config, { isDev }) {
      if (isDev) {
        config.resolve.symlinks = false
      }
      config.externals = {
        bufferutil: 'commonjs bufferutil',
        'utf-8-validate': 'commonjs utf-8-validate'
      }
    } //,
    // babel: { compact: true }
  },
  /*
   ** Apollo configuration
   */
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          'https://eqn5ppojg5fglkdqoqfdfuy5am.appsync-api.us-west-2.amazonaws.com/graphql'
      }
    },
    errorHandler: '@/plugins/graphql-errorhandler'
  },

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons', // Solid icons
        icons: [
          'faArrowRight',
          'faArrowLeft',
          'faCircle',
          'faExclamationCircle',
          'faPlus',
          'faEllipsisV',
          'faTimes',
          'faStar',
          'faTimesCircle',
          'faTrash',
          'faAngleDown'
        ]
      },
      {
        set: '@fortawesome/free-brands-svg-icons', // Brand icons
        icons: [
          'faDev',
          'faFacebookF',
          'faTwitter',
          'faInstagram',
          'faYoutube',
          'faGithub'
        ]
      }
    ]
  },

  pwa: {
    manifest: {
      name: 'Motor Safety',
      short_name: 'Motor Safety',
      description: 'Protecting Drivers Everywhere'
    },
    meta: {
      name: 'Motor Safety',
      ogSiteName: 'Motors Safety',
      ogTitle: 'Motor Safety',
      description: 'Protecting Drivers Everywhere',
      ogDescription: 'Protecting Drivers Everywhere',
      twitterSite: 'https://twitter.com/motorsafetyorg',
      ogUrl: 'https://motorsafety.org'
    }
  },

  sitemap: {
    gzip: true,
    hostname: 'https://www.motorsafety.org'
  },

  cache: {
    useHostPrefix: false
  },

  generate: {
    interval: 50,
    crawler: false,
    // concurrency: 500,
    fallback: true,

    routes: [resolveRoutes, '/',
      '/login/',
      '/profile/',
      '/my-garage/',
      '/dealers/',
      '/terms/',
      '/faqs/',
      '/privacy/',
      '/about-us/',
      '/contact-us/',
      '/recall-news/',
      '/recall-search-result/',
      '/recall-search-detailed/']
  },

  hooks: {
    // This hook is called before generatic static html files for SPA mode
    'generate:page': (page) => {
      page.html = modifyHtml(page.html)
    },
    // This hook is called before rendering the html to the browser
    'render:route': (url, page, { req, res }) => {
      page.html = modifyHtml(page.html)
    }
  },

  router: {
    prefetchLinks: false,
    trailingSlash: true
  },

  ignore: ['**/*.test.*', '/logs', '**/*.log', '.generator']
}
