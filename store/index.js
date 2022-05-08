// 存储登录状态以及暗夜模式
export const state = () => ({
  token: null,
  dark: null,
  title: '宿舍管理系统'
})
export const mutations = {
  uptoken (state, num) {
    state.token = num
  },
  updark (state, num) {
    state.dark = num
  },
  uptitle (state, num) {
    state.title = num
  }
}
