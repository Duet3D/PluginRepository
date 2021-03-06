const { description } = require('../../package')

module.exports = {
  title: 'Duet3D Plugin Repository',
  base: '/PluginRepository/',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'icon', href: 'https://avatars.githubusercontent.com/u/59487011' }],
  ],

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
        text: 'Products',
        link: 'https://www.duet3d.com/products'
      },
      {
        text: 'Forum',
        link: 'https://forum.duet3d.com'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/duet3D/'
      }
      // {
      //   text: 'Plugins',
      //   link: '/plugins/'
      // }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'using-vue',
          ]
        }
      ]
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
