// 全局过滤器 时间戳
import dayjs from 'dayjs'
import Vue from 'vue'
Vue.filter('timeFormater', function (value, str = 'YYYY-MM-DD HH:mm:ss') {
  const date = new Date(value * 1000)
  return dayjs(date).format(str)
})
