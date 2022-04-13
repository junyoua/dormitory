<template>
  <el-scrollbar  style="height: 100%;width: 100%;margin-right: 17px">
  <div class="nav-main">
    <el-radio-group v-model="isCollapse" class="nav-title">
      <el-radio-button v-show="isCollapse==false" :label="true">
        <i class="el-icon-caret-left" />
      </el-radio-button>
      <el-radio-button v-show="isCollapse" :label="false">
        <i class="el-icon-caret-right" />
      </el-radio-button>
    </el-radio-group>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-tickets" />
          <span slot="title">校园管理</span>
        </template>
        <el-menu-item-group>
          <span slot="title">校园管理</span>
          <el-menu-item index="1-1" @click="school_information">
            学校管理
          </el-menu-item>
          <el-menu-item index="1-2" @click="goclass">
            班级管理
          </el-menu-item>
          <el-menu-item index="1-3" @click="student">
            学生管理
          </el-menu-item>
          <el-menu-item index="1-4" @click="dormitory">
            宿舍管理
          </el-menu-item>
          <el-menu-item index="1-5" @click="repair">
            维修管理
          </el-menu-item>
          <el-menu-item index="1-6" @click="inspect">
            评分管理
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-edit-outline" />
          <span slot="title">操作管理</span>
        </template>
        <el-menu-item-group>
          <span slot="title">操作管理</span>
          <el-menu-item index="2-1">
            宿舍维修反馈
          </el-menu-item>
          <el-menu-item index="2-2">
            学生宿舍分配
          </el-menu-item>
          <el-menu-item index="2-3">
            学生宿舍变更
          </el-menu-item>
          <el-menu-item index="2-4">
            学生宿舍检查
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3" @click="loginout">
        <i class="el-icon-switch-button" />
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
  </div>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    // 跳转到学校信息
    school_information () {
      this.$router.push('/school_information')
    },
    goclass () {
      this.$router.push('/class')
    },
    student () {
      this.$router.push('/student')
    },
    dormitory () {
      this.$router.push('/dormitory')
    },
    repair () {
      this.$router.push('/repair')
    },
    inspect () {
      this.$router.push('/inspect')
    },
    // 退出登录
    loginout () {
      this.$axios.post('api/api/user/logout').then((res) => {
        if (res.data.code) {
          this.$router.push('/login')
          this.$store.commit('uptoken', null)
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
/deep/.el-scrollbar__wrap{
  overflow: auto;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  max-height: 100vh;
}

.nav-main {
  width: 100%;

  .nav-title {
    min-width: 100%;
    margin: 1px 0 20px 0;
    label{
      width: 100%;
      /deep/.el-radio-button__inner{
        width: 100%;
        padding: 12px 0;
        border-left: 0;
        border-right: 0;
        color:var(--white);
        background-color: var(--navbg);
        border-bottom: 1px solid var(--border);
      }
    }
  }
  /deep/.el-submenu__title{
    padding: 0 35px;
  }
}
</style>
