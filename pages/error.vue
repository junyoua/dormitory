<template>
  <div class="error">
    <img v-pre class="error_img" src="../assets/error_404.jpg">
    <div class="tips">
      <h4 v-pre>
        Sorry 404 找不到此页面!
      </h4>
      <el-button type="primary" size="medium" @click="back">
        返回页面
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timedata: 10
    }
  },
  created () {
    this.time()
  },
  methods: {
    time () {
      const that = this
      const timeInterval = setInterval(function () {
        that.timedata--
        if (that.timedata <= 0) {
          that.back()
        } else if (that.$route.path !== '/error') {
          clearInterval(timeInterval)
        } else {
          that.$message({
            message: `Tips:404没有此页面，${that.timedata}后自动跳回主页面!`,
            type: 'error',
            duration: '1000'
          })
        }
      }, 1000)
    },
    back () {
      if (this.$store.state.token !== 'null') {
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.error {
  width: 100%;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  background-color: var(--errorbg)!important;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .error_img {
    width: 50%;
    border-radius: 5px;
  }

  .tips {
    h4 {
      font-size: 40px;
      margin: 20px 0;
      color: var(--red);
    }

    button {
      display: block;
      margin: 0 auto;
    }
  }
}

@media screen and (max-width: 750px) {
  .error {
    flex-wrap: wrap;

    .error_img {
      width: 100%;
    }

    .tips {
      h4 {
        display: none;
      }
    }
  }
}
</style>
