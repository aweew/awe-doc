import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),

  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',

  theme: defaultTheme({
        docsDir: 'docs',
        // 默认主题配置
        navbar: [
            {
                text: '🏠 首页',
                link: '/',
            },
            {
                text: '📖 我的网站',
                link: 'https://www.aweew.com',
            },
            {
                text: '🌏 Github',
                link: 'https://github.com/aweew',
            },
            {
                text: '📙 GitEE',
                link: 'https://gitee.com/aweew',
            },
        ],
    }),
})