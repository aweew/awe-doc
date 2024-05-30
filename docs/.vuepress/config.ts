import {viteBundler} from '@vuepress/bundler-vite'
import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import navConf from "./config/navConf";

export default defineUserConfig({
    bundler: viteBundler(),

    lang: 'zh-CN',
    title: 'Awe-docs',
    description: '这是我的第一个 VuePress 站点',
    head: [['link', {rel: 'icon', href: '/logo.png'}]],

    theme: defaultTheme({
        docsDir: 'docs',
        // 默认主题配置
        navbar: navConf,
    }),
})