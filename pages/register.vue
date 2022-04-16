<template>
  <div class="register">
    <div class="l-main">
      <div class="lmain-left">
        <div v-pre class="img" />
      </div>
      <div class="lmain-right">
        <div class="form-Box">
          <h4 v-pre>
            用户注册
          </h4>
          <div class="form">
            <label>所在学校：
              <el-input v-model="school" placeholder="请输入学校名称" maxlength="12" clearable @blur="schoolblur" />
            </label>
            <label>邀请码：
              <el-input v-model="code" placeholder="请输入邀请码" maxlength="6" clearable @blur="codeblur" />
            </label>
            <label>账号：
              <el-input v-model="name" placeholder="请输入账号" maxlength="16" clearable @blur="nameblur" />
            </label>
            <label>密码：
              <el-input v-model="passwd" placeholder="请输入密码" maxlength="16" show-password @blur="passwdblur" />
            </label>
            <el-button class="btn" type="primary" :disabled="isShow" @click="register">
              注册
            </el-button>
            <p class="tips" @click="login">
              已有账号？<span>去登录></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      code: '',
      name: '',
      passwd: '',
      school: '',
      schoolstate: '',
      passwdstate: false,
      codestate: false,
      namestate: false,
      isShow: false
    }
  },
  methods: {
    handleCommand (command) {
      this.schoolval = command
    },
    login () {
      this.$router.push('/login')
    },
    schoolblur () {
      const school = /^[\u4E00-\u9FA5]+$/
      if (this.school.match(school) && this.school.length >= 4) {
        this.$message({
          message: '学校名称输入成功',
          type: 'success'
        })
        this.schoolstate = true
      } else {
        this.$message({
          message: '学校名称只能为中文，至少为4位!',
          type: 'error'
        })
        this.schoolstate = false
      }
    },
    codeblur () {
      const code = /^[0-9]{6}$/
      if (this.code.match(code)) {
        this.$message({
          message: '邀请码输入成功',
          type: 'success'
        })
        this.codestate = true
      } else {
        this.$message({
          message: '邀请码格式错误，必须为6位!',
          type: 'error'
        })
        this.codestate = false
      }
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
    register () {
      this.isShow = true
      const that = this
      setTimeout(function () {
        that.isShow = false
      }, 3000)
      if (this.codestate && this.namestate && this.passwdstate && this.schoolstate) {
        axios({
          url: 'http://aa/register.php',
          method: 'post',
          params: {
            schoolname: this.school,
            name: this.name,
            pwd: this.passwd,
            code: this.code
          }
        }).then((res) => {
          if (res.data === 1) {
            this.$message({
              message: 'Tips:注册成功!',
              type: 'success'
            })
            this.$router.push('/login')
          } else if (res.data === 2) {
            this.$message({
              message: 'Tips:已有账号!',
              type: 'warning'
            })
          } else if (res.data === 3) {
            this.$message({
              message: 'Tips:邀请码不匹配!',
              type: 'error'
            })
          }
        })
      } else if (this.schoolval === false) {
        this.$message({
          message: '所在学校没有填写,至少为4位!',
          type: 'error'
        })
      } else if (this.codestate === false) {
        this.$message({
          message: '邀请码格式错误，至少为6位!',
          type: 'error'
        })
      } else if (this.namestate === false) {
        this.$message({
          message: '账号格式错误，至少为3位!',
          type: 'error'
        })
      } else if (this.passwdstate === false) {
        this.$message({
          message: '密码格式错误，至少为6位!',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100vh;
  margin: 0;
  position: relative;
  background-color: var(--loginbg)!important;

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
        padding: 6% 10%;
        background-color: var(--white);

        h4 {
          text-align: center;
          font-size: 30px;
          letter-spacing: 8px;
          color: var(--black);
          font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        }

        .form {
          margin: 20px 0;

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
          .tips{
            margin-top: 5px;
            cursor: pointer;
            text-align: center;
            letter-spacing: 2px;
            span{
              color: var(--red);
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .register {
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
