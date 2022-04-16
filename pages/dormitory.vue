<template>
  <div class="dormitory">
    <div class="box">
      <!--添加-->
      <el-button
        size="medium"
        type="primary"
        class="add"
        @click="dialogFormVisible = true"
      >
        <i class="el-icon-edit" /> 添 加 数 据
      </el-button>
      <el-dialog title="添加" :visible.sync="dialogFormVisible">
        <div class="block">
          <span class="demonstration">楼 层：</span>
          <el-cascader
            v-model="value"
            placeholder="请选择"
            :options="dormitorydata"
          />
        </div>
        <div class="block">
          <span class="demonstration">宿舍名称：</span>
          <el-input
            v-model="d_name"
            placeholder="请输入宿舍名称"
            clearable
          />
        </div>
        <div class="block">
          <span class="demonstration">宿舍可容纳人数：</span>
          <el-input
            v-model="d_number"
            placeholder="请输入宿舍可容纳人数"
            clearable
          />
        </div>
        <div class="block">
          <span class="demonstration">宿舍长电话号码：</span>
          <el-input
            v-model="d_phone"
            placeholder="请输入宿舍长电话号码"
            clearable
          />
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
      <el-dialog title="修改" :visible.sync="dialogFormVisible1">
        <div class="block">
          <span class="demonstration">宿舍名称：</span>
          <el-input
            v-model="d_name"
            placeholder="请输入宿舍名称"
            clearable
          />
        </div>
        <div class="block">
          <span class="demonstration">宿舍可容纳人数：</span>
          <el-input
            v-model="d_number"
            placeholder="请输入宿舍可容纳人数"
            clearable
          />
        </div>
        <div class="block">
          <span class="demonstration">宿舍长电话号码：</span>
          <el-input
            v-model="d_phone"
            placeholder="请输入宿舍长电话号码"
            clearable
          />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">
            取 消
          </el-button>
          <el-button type="primary" @click="submit1">
            确 定
          </el-button>
        </div>
      </el-dialog>
      <!--添加结束-->
      <el-table
        stripe
        :data="dormitory"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="id"
          label="ID"
        />
        <el-table-column
          prop="dormitory_name"
          label="宿舍所属"
        />
        <el-table-column
          prop="name"
          label="宿舍名字"
        />
        <el-table-column label="宿舍 居住人数/可居住人数">
          <template slot-scope="scope">
            <span>{{ scope.row.live_number }}/{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="principal"
          label="宿舍长电话号码"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="medium"
              type="primary"
              @click="handleUpdata(scope.row.id,scope.row.name,scope.row.number,scope.row.principal)"
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dormitory',
  data () {
    return {
      dormitory: [],
      dormitorydata: [],
      value: [],
      d_name: null,
      d_number: null,
      d_phone: null,
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      id: null
    }
  },
  watch: {
    dialogFormVisible1 (newdata) {
      if (newdata === false) {
        this.d_name = this.d_number = this.d_phone = ''
      }
    }
  },
  created () {
    this.getdormitory()
  },
  methods: {
    getdormitory () {
      this.$axios.post('api/api/dormitory/index').then((res) => {
        this.dormitory = res.data.data.rows
        this.dormitory.reverse()
      })
      this.$axios.get('api/api/of/selectpage').then((res) => {
        this.dormitorydata = res.data.data.rows
      })
    },
    handleUpdata (id, name, number, phone) {
      this.dialogFormVisible1 = true
      this.id = id
      this.d_name = name
      this.d_number = number
      this.d_phone = phone
    },
    handleDelete (id) {
      this.$axios.post('api/api/dormitory/del', { id }).then((res) => {
        if (res.data.code === 200) {
          this.getdormitory()
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
    submit1 () {
      if (this.id && this.d_name && this.d_number && this.d_phone) {
        this.$axios.post('api/api/dormitory/edit', {
          'row[id]': this.id,
          'row[name]': this.d_name,
          'row[number]': this.d_number,
          'row[principal]': this.d_phone
        }).then((res) => {
          if (res.data.code === 200) {
            this.dialogFormVisible1 = false
            this.getdormitory()
            this.$message({
              message: 'Tips:数据修改成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: 'Tips:数据修改失败！',
              type: 'error'
            })
          }
        })
      } else {
        this
          .$message({
            message: 'Tips:请把数据填写完整再修改！',
            type: 'error'
          })
      }
    },
    submit () {
      if (this.value[2] && this.d_name && this.d_number && this.d_phone) {
        this.$axios.post('api/api/dormitory/add', {
          of_id: this.value[2],
          name: this.d_name,
          number: this.d_number,
          principal: this.d_phone
        }).then((res) => {
          if (res.data.code === 200) {
            this.dialogFormVisible = false
            this.getdormitory()
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
.dormitory {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg);

  .box {
    width: 100%;
    height: auto;
    background-color: var(--white);

    .add {
      margin: 20px 25px;
      float: right;
    }

    .block {
      margin: 15px 0;
    }
  }
}
</style>
