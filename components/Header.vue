<template>
 <div id="Header">
   <div class="w">
     <div class="main">
       <img :src="header.img" alt="logo" title="logo">
       <h4>{{header.title}}</h4>
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
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      header: {
        title: '宿舍管理系统',
        img: 'https://dcdn.it120.cc/2022/04/09/5a97fb1f-98cc-48b4-ae54-b257cf2e8c8d.png'
      },
      value: this.$store.state.dark
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
  #Header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height:60px;
    z-index: 999;
    overflow: hidden;
    background-color: var(--blue);
    box-shadow: 0 2px 4px 0 var(--border-bottom);
    .w{
      width: 80%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      letter-spacing: 2px;
      justify-content: space-between;
      align-items: center;
      .main{
        width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img{
          width: 58px;
          height: 100%;
          vertical-align: middle;
          border-radius: 6px;
        }
        h4{
          width: 50%;
          margin: 0 auto;
          text-align: center;
          font-size: 22px;
          color: var(--white);
        }
        .switch{
          display: block;
          /deep/.el-switch__label *{
            color: var(--white);
          }
        }
      }
    }
  }
  @media screen and (max-width: 750px){
    #Header .w .main h4{
          font-size: 18px;
      }
  }
</style>
