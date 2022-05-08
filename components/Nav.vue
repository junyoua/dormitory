<template>
  <!------------------------- 导航栏 ------------------------->
  <el-row class="nav-row" v-show="isShow">
    <el-col :span="24">
      <el-menu
        :default-active="nav"
        class="el-menu-vertical-demo"
        @select="selectItems"
      >
        <!------------------------- 学校管理 ------------------------->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-tickets"/>
            <span>学校管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="/school_information">
              <el-menu-item index="1-1">
                学校管理
              </el-menu-item>
            </router-link>
            <router-link to="/class">
              <el-menu-item index="1-2">
                班级管理
              </el-menu-item>
            </router-link>
            <router-link to="/student">
              <el-menu-item index="1-3">
                学生管理
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <!------------------------- 操作管理 ------------------------->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-edit-outline"/>
            <span>操作管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="/dormitory">
              <el-menu-item index="2-1">
                宿舍管理
              </el-menu-item>
            </router-link>
            <router-link to="/repair">
              <el-menu-item index="2-2">
                维修管理
              </el-menu-item>
            </router-link>
            <router-link to="/inspect">
              <el-menu-item index="2-3">
                评分管理
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <!------------------------- 退出登录 ------------------------->
        <el-menu-item index="3">
          <i class="el-icon-switch-button"/>
          <span slot="title" @click="loginout">退出登录</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  <!------------------------- 导航栏 END ------------------------->
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      isShow: true,
      isCollapse: false,
      nav: '1-1'
    }
  },
  mounted () {
    // 如果页面宽度小于750px就执行隐藏
    if (document.body.clientWidth <= 750) {
      this.isCollapse = true
      document.querySelector('.nav-row').style.display = 'none'
    }
    // 获取nav所在的位置
    const navbar = window.sessionStorage.getItem('nav')
    if (navbar) {
      this.nav = navbar
      window.sessionStorage.setItem('nav', navbar)
    }
    // 监听页面宽度,判断是否显示导航栏
    this.$nextTick(function () {
      window.onresize = () => {
        return (() => {
          const screenWidth = document.body.clientWidth
          if (screenWidth <= 750) {
            this.isShow = false
          } else {
            this.isShow = true
          }
        })()
      }
    })
  },
  methods: {
    // 记录导航栏所在的位置
    selectItems (index) {
      this.nav = index
      window.sessionStorage.setItem('nav', index)
      if (document.body.clientWidth <= 750) {
        document.querySelector('.nav-row').style.display = 'none'
      }
      // 设置标题
      switch (index) {
        case '1-1':
          window.sessionStorage.setItem('title', '学校管理 - 宿舍管理系统')
          break
        case '1-2':
          window.sessionStorage.setItem('title', '班级管理 - 宿舍管理系统')
          break
        case '1-3':
          window.sessionStorage.setItem('title', '学生管理 - 宿舍管理系统')
          break
        case '2-1':
          window.sessionStorage.setItem('title', '宿舍管理 - 宿舍管理系统')
          break
        case '2-2':
          window.sessionStorage.setItem('title', '维修管理 - 宿舍管理系统')
          break
        case '2-3':
          window.sessionStorage.setItem('title', '评分管理 - 宿舍管理系统')
          break
        default:
          window.sessionStorage.setItem('title', '宿舍管理系统')
      }
    },

    // 退出登录
    loginout () {
      this.$axios.post('api/api/user/logout').then((res) => {
        if (res.data.code) {
          this.$router.push('/login')
          this.$store.commit('uptoken', null)
          window.sessionStorage.setItem('nav', '1-1')
          this.$message({
            message: 'Tips:退出登录成功!',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-row {
  margin: 1px 0;
  height: 100%;
  background: var(--h5conter);
  border-right: 1px solid #e0dede;
}

/deep/ .el-submenu__title {
  padding-left: 10px !important;
  padding: 0 5px !important;
}
/deep/ .el-menu-item-group__title{
  display: none;
}

/deep/ .el-submenu__title span,
/deep/ .el-menu-item span,
/deep/ .el-menu-item {
  color: var(--menu_item) !important;
}

.el-menu-item:focus, .el-menu-item:hover {
  background-color: transparent;
}

/deep/ .el-submenu__title:hover {
  background-color: transparent;
}

/deep/ .el-menu .is-active,/deep/ .el-menu .is-active span{
  color: #409eff !important;
}

</style>
