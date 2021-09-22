module.exports = {
  title: 'JI',// 设置网站标题
  description: '学习笔记',
  base: '/JiBlob/',   // 设置站点根路径
  dest: 'dist',  // 设置输出目录
  port: 8086,
  head: [],
  markdown: {
    includeLevel: [2, 3]
  },
  plugins: [],
  themeConfig: {
    // 添加导航栏
    nav: [
      { text: '主页', link: '/' },
      // { text: '生活', link: '/' },
      // {
      //   text: '学习',
      //   items: [
      //     { text: '英语', link: '/' },
      //     { text: '数学', link: '/' },
      //   ]
      // }
    ],
    search: false,
    searchMaxSuggestions: 10,
    displayAllHeaders: true,// 默认值：false
    sidebar: [
      {
        title: 'typescript',   // 必要的
        path: '/typescript/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
          '/typescript/ts实战vue.html',
          '/typescript/vue2ts实际案例.html',
          '/typescript/tsbase.html',
        ]
      },
      {
        title: 'vue系列',   // 必要的
        path: '/vueseries/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
          '/vueseries/vue3.html',
        ]
      },
      {
        title: 'node',   // 必要的
        path: '/node/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
          '/node/node01.html',
          // '/node/node02.html',
        ]
      },
    ],
    sidebarDepth: 2,//左侧导航显示的层级
    lastUpdated: 'Last Updated'
  }
}