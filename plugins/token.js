export default ({ app, store }) => {
  // 获取到session中store数据 有就存入
  if (sessionStorage.getItem('store') || localStorage.getItem('token')) {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      store.commit('uptoken', token)
    }
    if (sessionStorage.getItem('store')) {
      const token = sessionStorage.getItem('store')
      store.commit('uptoken', token)
    }
  }
  // 获取到暗夜模式状态 有就存入
  if (sessionStorage.getItem('dark')) {
    const dark = sessionStorage.getItem('dark')
    store.commit('updark', dark)
  }
  // 在页面刷新时将vuex里的信息保存到sessionStorage里
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('store', store.state.token)
    sessionStorage.setItem('dark', store.state.dark)
  })
  window.addEventListener('pagehide', () => {
    sessionStorage.setItem('store', store.state.token)
    sessionStorage.setItem('dark', store.state.dark)
  })
  //  暗夜模式切换
  if (store.state.dark === '1') {
    const html = document.querySelector('html')
    html.dataset.theme = 'dark'
  } else {
    const html = document.querySelector('html')
    html.dataset.theme = 'light'
  }
}
