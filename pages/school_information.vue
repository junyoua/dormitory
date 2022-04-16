<template>
  <div class="school_information">
    <ul class="school-nav">
      <template v-for="(item,index) in school.rows">
        <li :key="index" :class="item.name == active? 'list active':'list'" @click="nav_change(item.name)">
          {{ item.name }}
          <i class="el-icon-close delete" @click="deopen(item.id)"/>
        </li>
      </template>
      <li>
        <el-button type="primary" icon="el-icon-edit" @click="addschool">
          添加学校
        </el-button>
      </li>
    </ul>
    <div v-for="(item,index) in school.rows" :key="index" class="content">
      <template v-if="item.name == active">
        <el-table
          :data="item.park"
          style="width: 100%"
          row-key="id"
          stripe
          highlight-current-row
          border
          :tree-props="{children: 'building', hasChildren: 'hasChildren'}"
        >
          <el-table-column label="全称">
            <template slot-scope="scope">
              <div style="display: flex;justify-content: space-around;align-items: center">
                <span style="line-height: 39px">{{ scope.row.of }}</span>
                <el-button type="primary" icon="el-icon-edit" @click="addfloor(scope.row.id)" v-if="scope.row.level == 2">
                  添加楼层
                </el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="园区/楼层"
          />
          <el-table-column>
            <template slot="header">
              <div style="display: flex;justify-content: space-around;align-items: center;width: 100%">
                <span style="line-height: 39px">操作</span>
                <el-button type="primary" icon="el-icon-edit" @click="addpark">
                  添加园区
                  <input type="hidden" v-for="(item,index) in fschool" :key="index" ref="id" :value="item.id">
                </el-button>
              </div>
            </template>
            <template slot-scope="scope">
              <el-button
                size="medium"
                type="primary"
                @click="open(scope.row.id)"
              >
                修改
              </el-button>
              <el-popconfirm
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="handleDelete(scope.row.id)"
              >
                <el-button slot="reference" type="danger" size="medium">
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SchoolInformation',
  data () {
    return {
      school: [],
      school_rows: [],
      active: null,
      ids: []
    }
  },
  computed: {
    fschool () {
      return this.school_rows.filter(item => JSON.stringify(item).includes(this.active))
    }
  },
  created () {
    this.index()
  },
  mounted () {
    this.active = this.$route.query.ref
  },
  methods: {
    index () {
      this.$axios.post('api/api/of/index').then((res) => {
        this.school = res.data.data
        this.school_rows = res.data.data.rows
        if (!this.$route.query.ref) {
          this.$router.push({
            name: 'school_information',
            query: { ref: this.school.rows[0].name }
          })
          this.active = this.school.rows[0].name
        }
      })
    },
    addfloor (id) {
      this.$prompt('请输入楼层名称', '添加楼层', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$axios.post('api/api/of/add', {
          level: 3,
          name: value,
          pid: id
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加楼层成功!'
            })
            this.index()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    addpark () {
      this.$prompt('请输入园区名称', '添加园区', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$axios.post('api/api/of/add', {
          level: 2,
          name: value,
          pid: this.$refs.id[0].value
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加园区成功!'
            })
            this.index()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    addschool () {
      this.$prompt('请输入学校', '添加学校', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$axios.post('api/api/of/add', {
          level: 1,
          name: value
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加学校成功!'
            })
            this.index()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    nav_change (name) {
      this.active = name
      this.$router.push({
        name: 'school_information',
        query: { ref: name }
      })
    },
    deopen (id) {
      this.$confirm('是否删除该学校？', '删除学校提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.$axios.post('api/api/of/del', {
          id
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.index()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    open (id) {
      this.$prompt('请输入修改园区/楼层的名称', ' 修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.handleEdit(id, value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleEdit (id, name) {
      this.$axios.post('api/api/of/edit', {
        id,
        name
      }).then((res) => {
        if (res.data.code === 200) {
          this.index()
          this.$message({
            message: 'Tips:修改成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: 'Tips:修改失败！',
            type: 'error'
          })
        }
      })
    },
    handleDelete (id) {
      this.$axios.post('api/api/of/del', { id }).then((res) => {
        if (res.data.code === 200) {
          this.index()
          this.$message({
            message: 'Tips:删除成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: 'Tips:删除失败！',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.school_information {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg);

  .school-nav {
    width: 100%;
    padding: 7.5px 10px;
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: var(--nav);

    .list {
      margin: 0 2%;
      text-align: center;
      cursor: pointer;
      font-size: 16px;
      color: var(--tips);

      .delete:hover {
        color: var(--red);
      }
    }

    .active {
      color: var(--navblue);

      &:after {
        width: 100%;
        height: 3px;
        display: block;
        content: '';
        border-bottom: 1px solid var(--navblue);
        color: var(--navblue);
      }
    }
  }

  /deep/ .cell {
    //width: 100%;
    //display: flex;
    //align-items: center;
    //justify-content: space-evenly;
    text-align: left;
  }
}
</style>
