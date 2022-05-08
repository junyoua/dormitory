// 获取后端token
import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true

// axios请求添加token
export default function ({ $axios, redirect, router, store }) {
  $axios.onRequest((config) => {
    const token = store.state.token
    if (token) {
      config.headers.token = token
    }
    // 提交键值对
    config.data = qs.stringify(config.data, {
      allowDots: true
    })
    return config
  })
  // 解决报401错误
  $axios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    if (error.response.status === 401) {
      store.commit('uptoken', null)
      localStorage.clear()
      const data = '登录状态失效,请重新登录!'
      redirectLogin()
      return Promise.reject(data)
    }
  })
}
// 401报错重定向登录页面
function redirectLogin () {
  window.location.replace('/login')
}
