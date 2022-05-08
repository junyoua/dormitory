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
        <i class="el-icon-edit"/> 添 加 数 据
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
                  <el-option :key="index" :label="item.name" :value="item.id"/>
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
                  <el-option :key="index" :label="item.label" :value="item.value"/>
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
                  <el-option :key="index" :label="item.name" :value="item.id"/>
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
                  <el-option :key="index" :label="item.label" :value="item.value"/>
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
        class="box-table"
        :data="student"
        style="width: 100%"
        :default-sort="{prop: 'student_number', order: 'descending'}"
      >
        <el-table-column
          sortable
          prop="student_number"
          label="学号"
          width="130"
        />
        <el-table-column
          prop="class_name"
          label="班级"
          min-width="150"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="150"
        />
        <el-table-column label="性别"  width="150">
          <template slot-scope="scope">
            <i v-show="scope.row.sex==0" class="el-icon-male" style="color: #409EFF;font-size: 20px;"/>
            <i v-show="scope.row.sex==1" class="el-icon-female" style="color: var(--red);font-size: 20px"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="dormitory_name"
          label="宿舍"
          width="150"
        />
        <el-table-column
          label="添加时间"
          width="160"
        >
          <template slot-scope="scope">
            <span v-show="scope.row.createtime">{{ scope.row.createtime | timeFormater }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="medium"
              type="primary"
              @click="handleUpdata(scope.row.id,scope.row.name,scope.row.sex,scope.row.class_name,scope.row.dormitory_name,scope.row.dormitory_id)"
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
      <el-card class="box-card">
        <div v-for="(item,index) in student" :key="index" class="item">
          <div class="box">
            <p>学生学号：{{item.student_number}}</p>
            <p>班级：{{item.class_name}}</p>
            <p>名字：{{item.name}}</p>
            <p>性别：
              <i v-show="item.sex==0" class="el-icon-male" style="color: #409EFF;font-size: 20px;"/>
              <i v-show="item.sex==1" class="el-icon-female" style="color: var(--red);font-size: 20px"/>
            </p>
            <p>宿舍：{{item.dormitory_name}}</p>
            <p>添加时间：{{ item.createtime | timeFormater }}</p>
            <div class="btn">
              <el-button type="primary"  size="medium" @click="handleUpdata(item.id,item.name,item.sex,item.class_name,item.dormitory_name,item.dormitory_id)">
                修 改
              </el-button>
              <el-popconfirm
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="handleDelete(item.id)"
              >
                <el-button slot="reference" type="danger"  size="medium">删除</el-button>
              </el-popconfirm>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Student',
  head: {
    title: '学生管理 - 宿舍管理系统'
  },
  data () {
    return {
      student: [],
      value: [],
      floor: [],
      dormitorydata: [],
      dormitory: null,
      dormitoryid: null,
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
    },
    dormitoryid (newdata) {
      if (newdata !== null) {
        this.$axios.post('api/api/of/index', { id: newdata }).then((res) => {
          this.value = res.data.data[0].of_id
        })
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
    handleUpdata (id, name, sex, classname, dormitoryname, dormitoryid) {
      this.dialogFormVisible1 = true
      this.s_id = id
      this.s_name = name
      this.radio = sex
      this.student_class = classname
      this.dormitory = dormitoryname
      this.dormitoryid = dormitoryid
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
    overflow: hidden;
    background-color: var(--whitebg);

    .add {
      margin: 20px 25px;
      float: right;
    }
    /deep/ .el-dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: 0 !important;
      transform: translate(-50%, -50%);
    }

    .block {
      margin: 15px 0;
    }
  }
  .box-card{
    display: none;
  }
}

@media screen and (max-width: 750px) {
  .student {
    .box {
      /deep/ .el-dialog {
        width: 95%;
      }
    }
    .box-card{
      display: block!important;
      width: 95%;
      margin: 0 auto 5vw auto;
      background-color: var(--h5conter);
      .item{
        margin: 5vw 0;
        border-bottom: 1px solid var(--grey);
        .box{
          background-color: var(--h5conter);
          p{
            margin: 1vw 0;
            color: var(--menu_item);
          }
          .btn{
            margin: 5vw 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        }
      }
    }
    .box-table{
      display: none;
    }
  }
}
</style>
