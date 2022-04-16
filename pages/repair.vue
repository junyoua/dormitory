<template>
  <div class="repair">
    <div class="box">
      <!--添加按钮-->
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
            placeholder="请选择楼层"
            :options="floordata"
          />
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="宿 舍 :">
              <el-select v-model="dormitory" placeholder="请选择宿舍">
                <template v-for="(item,index) in dormitorydata">
                  <el-option :key="index" :label="item.label" :value="item.value" />
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <span class="demonstration">类 型：</span>
          <el-input
            v-model="w_type"
            placeholder="请输入维修类型"
            clearable
          />
        </div>
        <div class="block">
          <span class="demonstration">内 容：</span>
          <el-input
            v-model="w_content"
            placeholder="请输入维修内容"
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
          <span class="demonstration">类 型：</span>
          <el-input
            v-model="w_type"
            placeholder="请输入维修类型"
            clearable
          />
        </div>
        <div class="block">
          <span class="demonstration">内 容：</span>
          <el-input
            v-model="w_content"
            placeholder="请输入维修内容"
            clearable
          />
        </div>
        <div class="block">
          <el-radio v-model="w_status" label="0">
            已上报
          </el-radio>
          <el-radio v-model="w_status" label="1">
            已维修
          </el-radio>
          <el-radio v-model="w_status" label="2">
            无法维修
          </el-radio>
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
      <el-table
        stripe
        :data="repair"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="of"
          label="所属楼全称"
        />
        <el-table-column
          prop="dormitory_name"
          label="宿舍名称"
        />
        <el-table-column
          prop="content"
          label="维修内容"
        />
        <el-table-column label="维修类型">
          <template slot-scope="scope">
            <el-tag
              type="danger"
            >
              {{ scope.row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="principal"
          label="宿舍长电话号码"
        />
        <el-table-column label="维修结果" width="120">
          <template slot-scope="scope">
            <el-tag
              v-show="scope.row.status==0"
              effect="dark"
            >
              已上报
            </el-tag>
            <el-tag
              v-show="scope.row.status==1"
              type="success"
              effect="dark"
            >
              已维修
            </el-tag>
            <el-tag
              v-show="scope.row.status==2"
              type="danger"
              effect="dark"
            >
              无法维修
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label=" 发起维修时间"
          sortable
        >
          <template slot-scope="scope">
            <span v-show="scope.row.createtime">{{ scope.row.createtime | timeFormater }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="medium"
              type="primary"
              @click="handleUpdata(scope.row.id,scope.row.type,scope.row.content,scope.row.status)"
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
  name: 'Repair',
  data () {
    return {
      repair: [],
      value: [],
      dormitorydata: [],
      floordata: [],
      dormitory: null,
      w_type: null,
      w_id: null,
      w_content: null,
      w_status: null,
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      formLabelWidth: '120px'
    }
  },
  watch: {
    value (newName) {
      if (newName[2]) {
        // 宿舍
        const id = newName[2]
        this.$axios.post('api/api/dormitory/selectpage', { id }).then((res) => {
          this.dormitorydata = res.data.data.rows
        })
      }
    },
    dialogFormVisible1 (newdata) {
      if (newdata === false) {
        this.w_id = this.w_type = this.w_content = this.w_status = ''
      }
    }
  },
  created () {
    this.getrepair()
  },
  methods: {
    getrepair () {
      this.$axios.get('api/api/dormitory/repair').then((res) => {
        this.repair = res.data.data.rows
        this.repair.reverse()
      })
      // 楼层
      this.$axios.get('api/api/of/selectpage').then((res) => {
        this.floordata = res.data.data.rows
      })
    },
    handleUpdata (id, type, content, status) {
      this.dialogFormVisible1 = true
      this.w_id = id
      this.w_type = type
      this.w_content = content
      this.w_status = status
    },
    handleDelete (id) {
      this.$axios.post('api/api/dormitory/repair_del', { id }).then((res) => {
        if (res.data.code === 200) {
          this.getrepair()
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
      if (this.w_id && this.w_type && this.w_content && this.w_status) {
        this.$axios.post('api/api/dormitory/repair_edit', {
          'row[id]': this.w_id,
          'row[type]': this.w_type,
          'row[content]': this.w_content,
          'row[status]': this.w_status
        }).then((res) => {
          if (res.data.code === 200) {
            this.dialogFormVisible1 = false
            this.getrepair()
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
        this.$message({
          message: 'Tips:请把数据填写完整再修改！',
          type: 'error'
        })
      }
    },
    submit () {
      if (this.dormitory && this.w_type && this.w_content) {
        this.$axios.post('api/api/dormitory/repair_add', {
          dormitory_id: this.dormitory,
          type: this.w_type,
          content: this.w_content,
          image: ''
        }).then((res) => {
          if (res.data.code === 200) {
            this.dialogFormVisible = false
            // 清空选择值
            this.dormitory = this.w_type = this.w_content = ''
            this.getrepair()
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
.repair {
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
