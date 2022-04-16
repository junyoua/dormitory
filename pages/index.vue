<template>
  <div class="Home">
        <div class="home-Box">
         <div class="search">
           <el-tag>查询</el-tag>
           <el-select v-model="value" placeholder="姓名">
             <el-option
               v-for="item in cities"
               :key="item.value"
               :label="item.label"
               :value="item.value">
               <span style="float: left">{{ item.label }}</span>
               <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
             </el-option>
           </el-select>
           <el-input
             placeholder="请输入内容"
             v-model="input"
             class="input"
             clearable>
           </el-input>
           <el-button type="primary">查询</el-button>
         </div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="日期"
              width="300">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              width="300">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>住址: {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="地址"
              width="500">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>住址: {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.address }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="open(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="名字" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
    <!--          <el-form-item label="地址" :label-width="formLabelWidth">-->
    <!--            <el-select v-model="form.region" placeholder="请选择活动区域">-->
    <!--              <el-option label="区域一" value="shanghai"></el-option>-->
    <!--              <el-option label="区域二" value="beijing"></el-option>-->
    <!--            </el-select>-->
    <!--          </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  data () {
    return {
      cities: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Nanjing',
        label: '南京'
      }, {
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }],
      value: '',
      input: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        address: ''
      },
      formLabelWidth: '70px',
      list: [
        {
          id: 3,
          name: '406',
          number: 4,
          principal: '1234567',
          live_number: 2,
          dormitory_name: '友谅楼'
        },
        {
          id: 8,
          name: '太平天国',
          number: 4,
          principal: '123123123',
          live_number: 0,
          dormitory_name: '友谅楼'
        },
        {
          id: 9,
          name: '张为是混蛋',
          number: 4,
          principal: '123456',
          live_number: 0,
          dormitory_name: '友谅楼'
        }
      ]
    }
  },
  computed: {
    flist () {
      return this.list.filter(item => JSON.stringify(item).includes('id: 9'))
    }
  },
  mounted () {
    const reload = sessionStorage.getItem('reload')
    if (reload === '1') {
      sessionStorage.setItem('reload', '0')
      this.$router.go(0)
    }
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
    },
    open (index, row) {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
 .Home{
   width: 100%;
   height: 100%;
   .home-Box{
     width: 96%;
     height:auto;
     margin: 20px  2% ;
     .search{
       width: 100%;
       padding: 10px 20px;
       display: flex;
       justify-content: space-around;
       align-items: center;
       border-radius: 3px;
       opacity: .8;
       background-color: var(--navbg);
       .input{
         width: 40%;
         margin: 0 8%;
       }
     }
     /deep/.cell{
       text-align: center;
     }
   }
 }
</style>
