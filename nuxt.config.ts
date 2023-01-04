// https://nuxt.com/docs/api/configuration/nuxt-config

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

const isDev = process.env.NODE_ENV === 'development'
export default defineNuxtConfig({
  components: true,
  build: {
    analyze: true,
    transpile: [...(isDev ? [] : ['@babel/runtime']), 'lodash-es'],
  },

  vite: {
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver({ resolveIcons: true })],
      }),
    ],
    ssr: {
      noExternal: [
        'moment',
        'compute-scroll-into-view',
        'ant-design-vue',
        '@ant-design/icons-vue',
      ],
    },
  },
  css: [
    // "ant-design-vue/dist/antd.css",
    'bootstrap-scss/bootstrap-utilities.scss',
    'ant-design-vue/es/message/style/index.css',
    '~/assets/scss/global.scss',
  ],
  modules: ['@nuxtjs/i18n'],
  i18n: {
    vueI18n: {
      fallbackLocale: 'en',
    },
    locales: [
      {
        code: 'vi',
        iso: 'vi-VN',
        file: 'vi-VN.js',
        name: 'Tiếng Việt',
      },
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
        name: 'English',
      },
    ],
    defaultLocale: 'vi',
    lazy: true,
    langDir: 'locales',
  },
})
