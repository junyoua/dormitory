<template>
  <div class="student">
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
            placeholder="请选择楼层"
            :options="floor"
          />
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="宿 舍 :">
              <el-select v-model="dormitory" placeholder="请选择宿舍">
                <template v-for="(item,index) in dormitorydata">
                  <el-option :key="index" :label="item.name" :value="item.id" />
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="班 级 :">
              <el-select v-model="student_class" placeholder="请选择班级">
                <template v-for="(item,index) in studentclass">
                  <el-option :key="index" :label="item.label" :value="item.value" />
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <span class="demonstration">学 号：</span>
          <el-input
            v-model="s_number"
            placeholder="请输入学生的学号"
            clearable
          />
        </div>
        <div class="block">
          <span class="demonstration">名 字：</span>
          <el-input
            v-model="s_name"
            placeholder="请输入学生名字"
            clearable
          />
        </div>
        <div class="block">
          <span class="demonstration">性 别：</span>
          <el-radio v-model="radio" label="0">
            男
          </el-radio>
          <el-radio v-model="radio" label="1">
            女
          </el-radio>
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
          <span class="demonstration">楼 层：</span>
          <el-cascader
            v-model="value"
            placeholder="请选择楼层"
            :options="floor"
          />
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="宿 舍 :">
              <el-select v-model="dormitory" placeholder="请选择宿舍">
                <template v-for="(item,index) in dormitorydata">
                  <el-option :key="index" :label="item.name" :value="item.id" />
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="班 级 :">
              <el-select v-model="student_class" placeholder="请选择班级">
                <template v-for="(item,index) in studentclass">
                  <el-option :key="index" :label="item.label" :value="item.value" />
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <span class="demonstration">名 字：</span>
          <el-input
            v-model="s_name"
            placeholder="请输入学生名字"
            clearable
          />
        </div>
        <div class="block">
          <span class="demonstration">性 别：</span>
          <el-radio v-model="radio" label="0">
            男
          </el-radio>
          <el-radio v-model="radio" label="1">
            女
          </el-radio>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
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
        :data="student"
        style="width: 100%"
        :default-sort = "{prop: 'student_number', order: 'ascending'}"
      >
        <el-table-column
          prop="student_number"
          label="学号"
        />
        <el-table-column
          prop="class_name"
          label="班级"
        />
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column label="性别">
          <template slot-scope="scope">
            <i v-show="scope.row.sex==0" class="el-icon-male" style="color: var(--blue);font-size: 20px;" />
            <i v-show="scope.row.sex==1" class="el-icon-female" style="color: var(--red);font-size: 20px" />
          </template>
        </el-table-column>
        <el-table-column
          prop="dormitory_name"
          label="宿舍"
        />
        <el-table-column
          label="添加时间"
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
              @click="handleUpdata(scope.row.id,scope.row.name,scope.row.sex,scope.row.class_name,scope.row.dormitory_name)"
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
  name: 'Student',
  data () {
    return {
      student: [],
      value: [],
      floor: [],
      dormitorydata: [],
      dormitory: null,
      radio: '0',
      s_number: null,
      s_id: null,
      s_name: null,
      studentclass: [],
      student_class: null,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisible1: false
    }
  },
  watch: {
    value (newName) {
      if (newName[2]) {
        // 宿舍
        const id = newName[2]
        this.$axios.post('api/api/dormitory/student_selectpage', { id }).then((res) => {
          this.dormitorydata = res.data.data.rows
        })
      }
    },
    dialogFormVisible1 (newdata) {
      if (newdata === false) {
        this.id = this.s_name = this.student_class = this.dormitory = this.value = ''
        this.radio = '0'
      }
    }
  },
  created () {
    this.getstudent()
  },
  computed: {
    fclass () {
      return this.studentclass.filter(item => JSON.stringify(item).includes(this.student_class))
    }
  },
  methods: {
    getstudent () {
      this.$axios.post('api/api/studentclass/student').then((res) => {
        this.student = res.data.data.rows
        this.student.reverse()
      })
      // 楼层
      this.$axios.get('api/api/of/selectpage').then((res) => {
        this.floor = res.data.data.rows
      })
      // 班级
      this.$axios.get('api/api/studentclass/selectpage').then((res) => {
        this.studentclass = res.data.data.rows
      })
    },
    handleUpdata (id, name, sex, classname, dormitoryname) {
      this.dialogFormVisible1 = true
      this.s_id = id
      this.s_name = name
      this.radio = sex
      this.student_class = classname
      this.dormitory = dormitoryname
    },
    handleDelete (id) {
      this.$axios.post('api/api/studentclass/student_del', { id }).then((res) => {
        if (res.data.code === 200) {
          this.getstudent()
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
      if (this.s_id !== null && this.s_name !== null && this.radio !== null && this.student_class !== null && this.dormitory !== null) {
        this.$axios.post('api/api/studentclass/student_edit', {
          'row[id]': this.s_id,
          'row[name]': this.s_name,
          'row[sex]': this.radio,
          'row[class_id]': this.fclass[0].value,
          'row[dormitory_id]': this.dormitory
        }).then((res) => {
          if (res.data.code === 200) {
            this.dialogFormVisible1 = false
            this.getstudent()
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
      if (this.dormitory && this.student_class && this.s_number && this.s_name && this.radio) {
        this.$axios.post('api/api/studentclass/student_add', {
          dormitory_id: this.dormitory,
          class_id: this.student_class,
          student_number: this.s_number,
          name: this.s_name,
          sex: this.radio
        }).then((res) => {
          if (res.data.code === 200) {
            this.dialogFormVisible = false
            this.getstudent()
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
.student {
  width: 100%;
  height: 100%;
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
