const { description } = require('../../package')

const webpack = require('webpack');

module.exports = {
  title: 'Duet3D Plugin Repository',
  base: '/',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'icon', href: 'https://avatars.githubusercontent.com/u/59487011' }],
  ],
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          VUE_APP_FE_SERVER_URL: JSON.stringify(process.env.VUE_APP_FE_SERVER_URL)
        }
      })
    ]
},
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nextLinks: false,
    prevLinks: false,
    nav: [
      // {
      //   text: 'Guide',
      //   link: '/guide/',
      // },
      // {
      //   text: 'Config',
      //   link: '/config/'
      // },
      {
        text: 'PRODUCTS',
        link: 'https://www.duet3d.com/products'
      },
      {
        text: 'FORUM',
        link: 'https://forum.duet3d.com'
      },
      {
        text: 'GITHUB',
        link: 'https://github.com/duet3D/'
      },
      {
        text: 'GUIDE',
        link: '/guide/'
      },
      // {
      //   text: 'Plugins',
      //   link: '/plugins/'
      // }
    ],
    sidebar: {

    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'register-components',
      {
        componentsDir: './components'
      }
  ]
}
