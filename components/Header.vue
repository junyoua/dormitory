<template>
  <!----------------------  Header ---------------------->
  <div id="Header">
    <div class="w">
      <div class="main">
        <!-------------------- 导航栏显示隐藏图标 ----------------->
        <i class="el-icon-s-fold showNav" @click="show"/>
        <!---------------------- LOGO图 ------------------------>
        <img :src="header.img" alt="logo" title="logo">
        <!----------------------- 标题 ------------------------->
        <h4>{{ header.title }}</h4>
        <!---------------------- 暗夜模式 ----------------------->
        <el-switch
          class="switch"
          v-model="value"
          active-color="#13ce66"
          active-text="暗夜模式"
          active-value="1"
          inactive-value="0"
          @change="updata"
        >
        </el-switch>
        <!---------------------- 暗夜模式 End ---------------------->
      </div>
    </div>
  </div>
  <!---------------------- Header End ---------------------->
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      header: {
        title: '学校管理 - 宿舍管理系统',
        img: 'https://dcdn.it120.cc/2022/04/09/5a97fb1f-98cc-48b4-ae54-b257cf2e8c8d.png'
      },
      value: this.$store.state.dark
    }
  },
  // 监听路由变化 更改标题
  watch: {
    $route (to) {
      if (to.path === '/login' || to.path === '/register') { return false }
      const title = window.sessionStorage.getItem('title')
      this.header.title = title
    }
  },
  // 刷新页面更新标题
  mounted () {
    this.$nextTick(function () {
      const title = window.sessionStorage.getItem('title')
      this.header.title = title
    })
  },
  methods: {
    // 是否开启暗夜模式 this.value: 1为开启 0为关闭
    updata () {
      if ((this.value !== this.$store.state.dark) && this.value !== null) {
        this.$axios.post('api/api/user/switch', {
          status: this.value
        }).then((res) => {
          const that = this
          if (res.data.code === 200 && this.value === '1') {
            this.$message({
              message: 'Tips:暗夜模式启动成功',
              type: 'success'
            })
            this.$store.commit('updark', this.value)
            that.$router.go(0)
          } else {
            this.$message({
              message: 'Tips:暗夜模式关闭成功',
              type: 'success'
            })
            this.$store.commit('updark', this.value)
            this.$router.go(0)
          }
        })
      }
    },
    show () {
      // 显示隐藏导航栏 打开导航栏自动回到顶部
      const navState = document.querySelector('.nav-row').style.display
      if (navState === '' || navState === 'block') {
        document.querySelector('.nav-row').style.display = 'none'
      } else {
        document.querySelector('.nav-row').style.display = 'block'
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        window.pageYOffset = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// Header
#Header {
  min-width: 375px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 999;
  overflow: hidden;
  background-color: var(--blue);
  box-shadow: 0 2px 4px 0 var(--border-bottom);

  .w {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    letter-spacing: 2px;
    justify-content: space-between;
    align-items: center;

    .main {
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .showNav {
        display: none;
        cursor: pointer;
        color: var(--tips);
      }

      img {
        width: 58px;
        height: 100%;
        vertical-align: middle;
        border-radius: 6px;
      }

      h4 {
        width: 50%;
        margin: 0 auto;
        text-align: center;
        font-size: 22px;
        color: var(--white);
      }

      .switch {
        /deep/ .el-switch__label * {
          color: var(--white);
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  #Header .w {
    width: 93%;

    .main h4 {
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 6px;
    }

    .showNav {
      display: block !important;
    }
  }
}
</style>
