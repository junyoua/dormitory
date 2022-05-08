<template>
  <div class="login">
    <div class="l-main">
      <div class="lmain-left">
        <div v-pre class="img"/>
      </div>
      <div class="lmain-right">
        <div class="form-Box">
          <h4 v-pre>
            用户登录
          </h4>
          <form class="form">
            <label>账号：
              <el-input v-model="name"
                        ref="name"
                        placeholder="请输入账号"
                        maxlength="16"
                        clearable
                        @blur="nameblur"
              />
            </label>
            <label>密码：
              <el-input
                v-model="passwd"
                placeholder="请输入密码"
                maxlength="16"
                show-password
                @keyup.enter.native="login"
              />
            </label>
            <el-button class="btn" type="primary" :disabled="isShow" @click.native="login">
              登录
            </el-button>
            <p class="tips" @click="regisiter">
              还没有账号？<span>去注册></span>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  transition: 'test',
  head: {
    title: '登录 - 宿舍管理系统'
  },
  data () {
    return {
      name: '',
      passwd: '',
      isShow: false,
      namestate: false,
      passwdstate: false
    }
  },
  watch: {
    passwd (data) {
      if (data.length >= 6) {
        this.passwdblur()
      }
    }
  },
  mounted () {
    this.$refs.name.focus()
  },
  methods: {
    handleCommand (command) {
      this.schoolval = command
    },
    nameblur () {
      const name = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
      if (this.name.match(name) && this.name.length >= 3) {
        this.$message({
          message: '账号输入成功',
          type: 'success'
        })
        this.namestate = true
      } else {
        this.$message({
          message: '账号格式错误，至少为3位!',
          type: 'error'
        })
        this.namestate = false
      }
    },
    passwdblur () {
      const pwd = /^[A-Za-z0-9.]+$/
      if (this.passwd.match(pwd) && this.passwd.length >= 6) {
        this.$message({
          message: '密码输入成功',
          type: 'success'
        })
        this.passwdstate = true
      } else {
        this.$message({
          message: '密码格式错误，至少为6位!',
          type: 'error'
        })
        this.passwdstate = false
      }
    },
    regisiter () {
      this.$router.push('/register')
    },
    login () {
      this.isShow = true
      const that = this
      setTimeout(function () {
        that.isShow = false
      }, 3000)
      if (this.namestate && this.passwdstate) {
        this.$axios.post('api/api/user/login', {
          account: this.name,
          password: this.passwd
        }).then((res) => {
          if (res.data.msg === '登录成功') {
            this.$message({
              message: 'Tips:登录成功!',
              type: 'success'
            })
            const token = res.data.data.userinfo.token
            const dark = res.data.data.userinfo.is_dark
            localStorage.setItem('token', token)
            this.$store.commit('uptoken', token)
            this.$store.commit('updark', dark)
            that.$router.push('/')
            sessionStorage.setItem('reload', '1')
          } else {
            this.$message({
              message: 'Tips:登录失败，请确认学校以及账号密码!',
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: 'Tips:请把账号密码填写完全!',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  margin: 0;
  position: relative;

  .l-main {
    width: 80%;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 5px;
    border: 1px solid var(--border);
    box-shadow: 1px 10px 10px var(--login-shadow);
    display: flex;
    justify-content: space-around;
    align-items: center;

    .lmain-left {
      flex: 1;
      height: 100%;
      background-color: var(--loginimg);

      .img {
        width: 100%;
        height: 100%;
        background: url("assets/dlbox.svg");
        background-size: 100% 100%;
      }
    }

    .lmain-right {
      flex: 1;
      height: 100%;
      border-radius: 5px;

      .form-Box {
        width: 100%;
        height: 100%;
        padding: 15% 10%;
        background-color: var(--white);

        h4 {
          text-align: center;
          font-size: 30px;
          letter-spacing: 8px;
          color: var(--black);
          font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        }

        .form {
          margin: 50px 0;

          label {
            width: 100%;
            height: auto;
            display: block;
            margin: 5px auto;
          }

          /deep/ .el-input {
            margin: 10px 0;
          }

          /deep/ .el-button {
            margin: 20px 0;
          }

          /deep/ .btn {
            width: 100%;
            margin: 20px 0;
            letter-spacing: 10px;
          }

          .tips {
            margin-top: 5px;
            cursor: pointer;
            text-align: center;
            letter-spacing: 2px;

            span {
              color: var(--red);
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .login {
    .l-main {
      width: 95%;
      height: auto;

      .lmain-left {
        display: none;
      }
    }
  }
}
</style>
