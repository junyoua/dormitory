// 获取后端token
import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true

// axios请求添加token
export default function ({ $axios, redirect, store }) {
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
}
