const contentful = require('contentful')
const config = require('./.contentful.json')
const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN
})

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | Demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js and Contentful' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.2/css/bulma.min.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
  ** plugins
  */
  plugins: ['./plugins/contentful.js'],
  /*
  ** router
  */
  router: {
    base: '/nux_blog/'
  },
  /*
  ** Generate configuration
  */
  generate: {
    routes () {
      return client.getEntries({
          'content_type': config.CTF_BLOG_POST_TYPE_ID
        }).then((entries) => {
        return [...entries.items.map(entry => `posts/${entry.fields.slug}`)]
      })
    }
  },
  /*
  ** Values that will be available via process.env
  */
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: config.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID
  }
}
