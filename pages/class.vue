<template>
 <div class="class">
   <el-table
     stripe
     :data="classdata"
     style="width: 100%">
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
       prop="id">
     </el-table-column>
     <el-table-column
       label="所属学校"
       prop="name">
     </el-table-column>
     <el-table-column
       label="班级"
       prop="class_name">
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
 </div>
</template>

<script>
export default {
  name: 'class',
  data () {
    return {
      classdata: []
    }
  },
  created () {
    this.getclass()
  },
  methods: {
    getclass () {
      this.$axios.post('api/api/studentclass/index').then((res) => {
        this.classdata = res.data.data.rows
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .class{
    width: 100%;
    height: 100%;
    background-color: var(--bg);
    form{
      padding: 0 2%;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
    }
  }
</style>
