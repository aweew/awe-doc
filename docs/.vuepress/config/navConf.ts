export default [
    {text: '🏠 首页', link: '/'},
    {text: '💻 后端', children: [
            {text: 'Java', link: '/backend/java/'},
            {text: 'Spring', link: '/backend/spring/'},
            {text: 'Nginx', link: '/backend/nginx/'},
            {text: 'MySQL', link: '/backend/mysql/'},
            {text: 'Redis', link: '/backend/redis/'},
            {text: 'Docker', link: '/backend/docker/'},
    ]},
    {text: '📗 前端', children: [
            {text: 'Web', link: '/frontend/web/'},
            {text: 'JavaScript', link: '/frontend/javascript/'},
            {text: 'TypeScript', link: '/frontend/typescript/'},
            {text: 'Vue', link: '/frontend/vue/'},
            {text: 'React', link: '/frontend/react/'},
    ]},
    {text: '🎯 算法', link: '/algorithm/'},
    {text: '🥤 更多', children: [
            {text: '博客', link: 'https://www.aweew.com'},
            {text: 'Github', link: 'https://github.com/aweew'},
            {text: 'Gitee', link: 'https://gitee.com/aweew'},
    ]},
];
