// 获取后端session
import axios from 'axios'
axios.defaults.withCredentials = true

// axios请求添加token
export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    const token = store.state.token
    if (token) {
      config.headers.token = token
    }
    return config
  })
}
