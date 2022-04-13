export default ({ app, store }) => {
  // 获取到session中store数据 有就存入
  if (sessionStorage.getItem('store')) {
    const token = sessionStorage.getItem('store')
    store.commit('uptoken', token)
  }
  // 在页面刷新时将vuex里的信息保存到sessionStorage里
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('store', store.state.token)
  })
  window.addEventListener('pagehide', () => {
    sessionStorage.setItem('store', store.state.token)
  })
}
