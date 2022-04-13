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
            :options="dormitory"
          />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取 消
          </el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
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
              effect="label"
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
      dormitory: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  created () {
    this.getrepair()
  },
  methods: {
    getrepair () {
      this.$axios.get('api/api/dormitory/repair').then((res) => {
        this.repair = res.data.data.rows
      })
      this.$axios.get('api/api/of/selectpage').then((res) => {
        this.dormitory = res.data.data.rows
      })
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
  }
}
</style>
