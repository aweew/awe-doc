import {viteBundler} from '@vuepress/bundler-vite'
import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import navConf from "./config/navConf";
import sidebarConf from "./config/sidebarConf";

export default defineUserConfig({
    bundler: viteBundler(),

    lang: 'zh-CN',
    title: 'Awe-docs',
    description: '个人笔记',

    theme: defaultTheme({
        logo: '/logo.png',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        editLink: true,
        editLinkText: '编辑文档',
        docsRepo: 'https://gitee.com/aweew/awe-doc',
        docsDir: 'docs',
        docsBranch: 'master',
        // 默认主题配置
        navbar: navConf,
        sidebar: sidebarConf,
    }),
})