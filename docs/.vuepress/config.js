module.exports = {
  title: 'JI',// 设置网站标题
  description: '学习笔记',
  base: '/',   // 设置站点根路径
  dest: './ROOT',  // 设置输出目录
  port: 8086,
  head: [],
  plugins: [],
  themeConfig: {
    // 添加导航栏
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '生活', link: '/life/' },
      {
        text: '学习',
        items: [
          { text: '英语', link: '/study/english/english01' },
          { text: '数学', link: '/study/math/math01' },
        ]
      }
    ],
    search: false,
    searchMaxSuggestions: 10,
    displayAllHeaders: true ,// 默认值：false
    // 为以下路由添加左侧边栏
    // sidebar:{
    //   '/foo/': [
    //     '',     /* /foo/ */
    //     'one',  /* /foo/one.html */
    //     'two'   /* /foo/two.html */
    //   ],

    //   '/bar/': [
    //     '',      /* /bar/ */
    //     'three', /* /bar/three.html */
    //     'four'   /* /bar/four.html */
    //   ],
    //   // fallback
    //   '/': [
    //     '',        /* / */
    //     'contact', /* /contact.html */
    //     'about'    /* /about.html */
    //   ]
    // },
    sidebar: [
      {
        title: 'typescript',   // 必要的
        path: '/typescript/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
          '/','/typescript/one.html','/typescript/two.html'
        ]
      },
    ],
    sidebarDepth: 2,//左侧导航显示的层级
    lastUpdated: 'Last Updated'
  }
}