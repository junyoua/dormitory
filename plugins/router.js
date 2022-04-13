// 路由守卫
export default ({ app, route, redirect, store }) => {
  app.router.beforeEach((to, from, next) => {
    if (process.client) {
      const token = store.state.token
      if (token === 'null' && to.path !== '/login' && to.path !== '/register') { redirect('/login') } else { next() }
    }
    next((vm) => {
      // 跳转页面并且返回顶部
      vm.body.scrollTop = 0
      vm.documentElement.scrollTop = 0
      vm.pageYOffset = 0
    })
  })
}
