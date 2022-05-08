<template>
  <div class="main">
    <Header v-if="notLogin&&notRegister&&notError"/>
    <div class="nav">
      <div class="nav-left" v-if="notLogin&&notRegister&&notError">
        <Nav/>
      </div>
      <nuxt class="nuxt"/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

/**
 * @description: 宿舍管理系统
 * @author: youyou,lele,chunpei,yuzhi,haoyan
 * @date: 2022-05-08 10:46:25
 */

export default {
  components: {
    Nav,
    Footer,
    Header
  },
  computed: {
    // 计算是否是登录页面
    notLogin () {
      return this.$route.path !== '/login'
    },
    notRegister () {
      return this.$route.path !== '/register'
    },
    notError () {
      return this.$route.path !== '/error'
    }
  },
  created () {
    // loading加载
    if (process.client) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$nextTick(function () {
        setTimeout(() => {
          loading.close()
        }, 500)
      })
    }
  },
  mounted () {
    // 设置版权信息
    console.log('@author:%c youyou、lele、chunpei、yuzhi、haoyan', 'color:red;')
  }
}
</script>

<style lang="scss" scoped>

.nav {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-around;

  .nav-left {
    width: auto;
    margin-top: 60px;
    background-color: var(--nuxtbg);
  }

  .nuxt {
    flex: 3;
    overflow: hidden;
    background-color: var(--nuxtbg);
    min-height: 100vh;
  }
}

.nuxt {
  margin-top: 60px;
}
</style>
