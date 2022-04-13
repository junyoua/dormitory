// 存储登录状态
export const state = () => ({
  token: null
})
export const mutations = {
  uptoken (state, num) {
    state.token = num
  }
}
