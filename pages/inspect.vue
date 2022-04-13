<template>
 <div class="inspect">
   <el-table
     stripe
     :data="inspect"
     style="width: 100%"
     :default-sort = "{prop: 'date', order: 'descending'}"
   >
     <el-table-column
       prop="of"
       label="所属全称">
     </el-table-column>
     <el-table-column
       prop="dormitory_name"
       label="宿舍">
     </el-table-column>
     <el-table-column label="宿舍 居住人数/可居住人数">
       <template slot-scope="scope" >
         <span>{{scope.row.live_number}}/{{scope.row.number}}</span>
       </template>
     </el-table-column>
     <el-table-column
       prop="principal"
       label="宿舍长电话">
     </el-table-column>
     <el-table-column
       label="创建时间"
       sortable>
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
  name: 'inspect',
  data () {
    return {
      inspect: []
    }
  },
  created () {
    this.getinspect()
  },
  methods: {
    getinspect () {
      this.$axios.post('api/api/dormitory/inspect').then((res) => {
        this.inspect = res.data.data.rows
      })
    },
    handleDelete (id) {
      this.$axios.post('api/api/dormitory/inspect_del', { id }).then((res) => {
        if (res.data.code === 200) {
          this.getinspect()
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
.inspect{
  width: 100%;
  height: 100%;
  background-color: var(--bg);
}
</style>
