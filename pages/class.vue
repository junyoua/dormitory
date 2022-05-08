<template>
  <!---------------------- Class ---------------------->
  <div class="class">
    <div class="box">
      <!---------------------- ClassData Add ---------------------->
      <el-button
        size="medium"
        type="primary"
        class="add"
        @click="dialogFormVisible = true"
      >
        <i class="el-icon-edit"/> 添 加 数 据
      </el-button>
      <el-dialog title="添加" :visible.sync="dialogFormVisible">
        <div class="block">
          <el-form>
            <el-form-item label="所属学校 :">
              <el-select v-model="school" placeholder="请选择所属学校">
                <template v-for="(item,index) in schooldata">
                  <el-option :key="index" :label="item.label" :value="item.value"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <span class="demonstration">班 级：</span>
            <el-input
              v-model="c_name"
              placeholder="请输入需要添加的班级名称"
              clearable
            />
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取 消
          </el-button>
          <el-button type="primary" @click="submit">
            确 定
          </el-button>
        </div>
      </el-dialog>
      <!---------------------- ClassData End ---------------------->
      <!-------------------------- PC ----------------------------->
      <el-table
        class="box-table"
        stripe
        :data="classdata"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="班级ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="学校ID">
                <span>{{ props.row.school_of }}</span>
              </el-form-item>
              <el-form-item label="学校名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="班级">
                <span>{{ props.row.class_name }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="班级 ID"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          label="所属学校宿舍"
          prop="name"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="班级"
          min-width="150"
          prop="class_name"
        >
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="medium"
              type="primary"
              @click="open(scope.row.id, scope.row.class_name)"
            >修改
            </el-button>
            <el-popconfirm
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="handleDelete(scope.row.id)"
            >
              <el-button slot="reference" type="danger" size="medium">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-------------------------- PC End ------------------------->
      <!--------------------------- H5 ---------------------------->
      <el-card class="box-card">
        <div v-for="(item,index) in classdata" :key="index" class="item">
          <div class="box">
            <p>班级ID：{{ item.id }}</p>
            <p>班级：{{ item.class_name }}</p>
            <p>所属学校：{{ item.name }}</p>
            <div class="btn">
              <el-button type="primary" size="medium" @click="open(item.id, item.class_name)">
                修 改
              </el-button>
              <el-popconfirm
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="handleDelete(item.id)"
              >
                <el-button slot="reference" type="danger" size="medium">删除</el-button>
              </el-popconfirm>
            </div>
          </div>
        </div>
      </el-card>
      <!-------------------------- H5 End ------------------------->
    </div>
  </div>
  <!---------------------- Class End ---------------------->
</template>

<script>
export default {
  name: 'class',
  head: {
    title: '班级管理 - 宿舍管理系统'
  },
  data () {
    return {
      classdata: [],
      schooldata: [],
      school: null,
      c_name: null,
      dialogTableVisible: false,
      dialogFormVisible: false
    }
  },
  created () {
    this.getclass()
  },
  methods: {
    getclass () {
      this.$axios.post('api/api/studentclass/index').then((res) => {
        this.classdata = res.data.data.rows
        this.classdata.reverse()
      })
      this.$axios.post('api/api/of/shool_selectpage').then((res) => {
        this.schooldata = res.data.data.rows
      })
    },
    handleDelete (id) {
      this.$axios.post('api/api/of/del', { id }).then((res) => {
        if (res.data.code === 200) {
          this.getclass()
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
    },
    // 修改
    open (id, classname) {
      this.$prompt('请输入修改的班级名称', '修改班级名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: classname
      }).then(({ value }) => {
        this.handleUpdata(id, value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleUpdata (id, name) {
      this.$axios.post('api/api/studentclass/edit', {
        id,
        name
      }).then((res) => {
        if (res.data.code === 200) {
          this.getclass()
          this.$message({
            message: 'Tips:信息修改成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: 'Tips:信息修改失败！',
            type: 'error'
          })
        }
      })
    },
    submit () {
      if (this.c_name) {
        this.$axios.post('api/api/studentclass/add', {
          name: this.c_name,
          school_of: this.school
        }).then((res) => {
          if (res.data.code === 200) {
            this.dialogFormVisible = false
            this.getclass()
            this.$message({
              message: 'Tips:数据添加成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: 'Tips:数据添加失败！',
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: 'Tips:请把数据填写完整再添加！',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.class {
  width: 100%;
  height: 100%;
  background-color: var(--bg);

  .box {
    overflow: hidden;
  }

  .box-card {
    display: none;
  }

  form {
    padding: 0 2%;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }

  .box {
    width: 100%;
    height: 100%;
    background-color: var(--whitebg);

    .add {
      margin: 20px 25px;
      float: right;
    }

    .block {
      margin: 15px 0;
    }
  }
}

@media screen and (max-width: 750px) {
  /deep/ .el-dialog {
    width: 95% !important;
  }
  .box-card {
    display: block !important;
    width: 95%;
    margin: 0 auto 5vw auto;
    background-color: var(--h5conter);

    .item {
      margin: 5vw 0;
      border-bottom: 1px solid var(--grey);

      .box {
        background-color: var(--h5conter);

        p {
          margin: 1vw 0;
          color: var(--menu_item);
        }

        .btn {
          margin: 5vw 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
    }
  }
  .box-table {
    display: none;
  }
}
</style>
