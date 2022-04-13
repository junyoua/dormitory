<template>
  <div class="school_information">
    <ul class="school-nav">
      <template v-for="(item,index) in school.rows">
        <li :class="item.name == active? 'list active':'list'" :key="index" @click="nav_change(item.name)">
          {{ item.name }}
        </li>
      </template>
    </ul>
    <div class="content" v-for="(item,index) in school.rows" :key="index">
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
          <el-table-column
            prop="of"
            label="全称"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="园区"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="medium"
                type="primary"
                @click="open(scope.row.id)"
              >修改
              </el-button>
              <el-popconfirm
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="handleDelete(scope.row.id)"
              >
                <el-button slot="reference" type="danger"  size="medium">删除</el-button>
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
  name: 'school_information',
  data () {
    return {
      school: [],
      active: null
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
        if (!this.$route.query.ref) {
          this.$router.push({
            name: 'school_information',
            query: { ref: this.school.rows[0].name }
          })
          this.active = this.school.rows[0].name
        }
      })
    },
    nav_change (name) {
      this.active = name
      this.$router.push({
        name: 'school_information',
        query: { ref: name }
      })
    },
    open (id) {
      this.$prompt('请输入修改园区的名称', ' 修改', {
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
    padding: 10px 10px;
    display: flex;
    justify-content: left;
    align-items: center;

    .list {
      margin: 0 3%;
      text-align: center;
      cursor: pointer;
      font-size: 16px;
      color: var(--tips);
    }

    .active {
      color: var(--blue);

      &:after {
        width: 100%;
        height: 3px;
        display: block;
        content: '';
        border-bottom: 1px solid var(--blue);
        color: var(--blue);
      }
    }
  }
  /deep/.cell{
    text-align: left;
  }
}
</style>
