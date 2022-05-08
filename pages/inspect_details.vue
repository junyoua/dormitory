<template>
  <div class="inspect_details">
    <div class="details_box">
      <el-descriptions title="查寝评论详情页面" :column="2" border :contentStyle="{'text-align': 'center'}">
        <template v-for="(item,index) in finspect">
          <el-descriptions-item label="全称" :key="index">{{ item.of }} {{ item.dormitory_name }}宿舍</el-descriptions-item>
          <el-descriptions-item label="宿舍人数" :key="index">{{ item.live_number }}/{{ item.number }}
          </el-descriptions-item>
          <el-descriptions-item label="宿舍长电话号码" :key="index">{{ item.principal }}</el-descriptions-item>
          <el-descriptions-item label="宿舍评分提交时间" :key="index">{{ item.createtime| timeFormater }}</el-descriptions-item>
          <el-descriptions-item label="宿舍总分"  :column="1" :key="index">
            <el-progress type="circle" :color="colors" :percentage="item.total"  :format="format"></el-progress>
          </el-descriptions-item>
        </template>
      </el-descriptions>
      <el-descriptions :column="1" border :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">
        <template  v-for="(item,index) in finspect">
        <el-descriptions-item label="床" :key="index" :column="1" ><el-tag type="danger"  effect="dark">{{item.bed}}分</el-tag></el-descriptions-item>
        <el-descriptions-item label="垃圾桶" :key="index" :column="1" ><el-tag type="danger"  effect="dark">{{item.dustbin}}分</el-tag></el-descriptions-item>
        <el-descriptions-item label="风扇" :key="index" :column="1" ><el-tag type="danger"  effect="dark">{{item.fan}}分</el-tag></el-descriptions-item>
        <el-descriptions-item label="灯" :key="index" :column="1" ><el-tag type="danger"  effect="dark">{{item.lamp}}分</el-tag></el-descriptions-item>
        <el-descriptions-item label="阳台" :key="index" :column="1" ><el-tag type="danger"  effect="dark">{{item.balcony}}分</el-tag></el-descriptions-item>
        <el-descriptions-item label="烟" :key="index" :column="1" ><el-tag type="danger"  effect="dark">{{item.smoke}}分</el-tag></el-descriptions-item>
        <el-descriptions-item label="水电" :key="index" :column="1" ><el-tag type="danger"  effect="dark">{{item.water_electricity}}分</el-tag></el-descriptions-item>
        <el-descriptions-item label="地板整洁度" :key="index" :column="1" ><el-tag type="danger"  effect="dark">{{item.floor}}分</el-tag></el-descriptions-item>
        <el-descriptions-item label="物品摆放" :key="index" :column="1" ><el-tag type="danger"  effect="dark">{{item.valuables}}分</el-tag></el-descriptions-item>
        <el-descriptions-item label="厕所" :key="index" :column="1" ><el-tag type="danger"  effect="dark">{{item.toilet}}分</el-tag></el-descriptions-item>
        </template>
      </el-descriptions>
    </div>
  </div>
</template>

<script>

export default {
  name: 'inspect_details',
  data () {
    return {
      inspect: [],
      inspectdata: [],
      colors: [
        {
          color: '#f56c6c',
          percentage: 60
        },
        {
          color: '#409eff',
          percentage: 80
        },
        {
          color: '#5cb87a',
          percentage: 90
        }
      ]
    }
  },
  created () {
    this.getinspect()
    if (!this.$route.params.id) {
      this.$router.go(-1)
    }
  },
  computed: {
    finspect () {
      // 数组筛选 根据id筛选
      return this.inspect.filter(item => item.id === this.$route.params.id)
    }
  },
  methods: {
    format (percentage) {
      return `${percentage}分`
    },
    getinspect () {
      this.$axios.post('api/api/dormitory/inspect').then((res) => {
        this.inspect = res.data.data.rows
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.inspect_details {
  width: 100%;
  height: 100%;
  padding: 0 5%;
  /deep/.el-descriptions__body .el-descriptions__table .el-descriptions-item__cell{
    text-align: center;
  }

  .details_box {
    width: 100%;
    height: auto;
    margin: 10px 0;
    position: relative;
    .progress{
      position: absolute;
      left: 0%;
      top: 30%;
    }
  }
}
@media screen and (max-width: 750px){
  .inspect_details {
    padding: 0 1%;
  }
}
</style>
