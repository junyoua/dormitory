<template>
   <div class="main">
     <Header v-if="notLogin&&notRegister&&notError"/>
     <div class="nav">
       <div class="nav-left" v-if="notLogin&&notRegister&&notError" >
         <Nav />
       </div>
       <nuxt class="nuxt"/>
     </div>
     <Footer v-if="notLogin&&notRegister&&notError"/>
   </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
export default {
  components: { Nav, Footer, Header },
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
  }
}
</script>

<style lang="scss" scoped>

  .nav{
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    .nav-left{
      width: auto;
      margin-top: 60px;
    }
    .nuxt{
      flex: 3;
      overflow: hidden;
      background-color: var(--bg);
      min-height: 100vh;
  }
}
  .nuxt{
    margin-top: 60px;
  }
</style>
