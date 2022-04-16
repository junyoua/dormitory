<template>
  <div class="inspect">
    <div class="box">
      <!--添加按钮-->
      <el-button
        size="medium"
        type="primary"
        class="add"
        @click="dialogFormVisible = true"
      >
        <i class="el-icon-edit"/> 添 加 数 据
      </el-button>
      <el-dialog  title="添加" :visible.sync="dialogFormVisible">
        <div class="block">
          <div class="el-form-item">
          <span class="demonstration">楼 层：</span>
          <el-cascader
            v-model="value"
            placeholder="请选择楼层"
            :options="floordata"
          />
          </div>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="宿 舍 :">
              <el-select v-model="dormitory" placeholder="请选择楼层再选择宿舍">
                <template v-for="(item,index) in dormitorydata">
                  <el-option :key="index" :label="item.label" :value="item.value"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="床 :">
              <el-select v-model="p_bed" placeholder="床的分数">
                <template v-for="(item,index) in num">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="物品摆放:">
              <el-select v-model="p_valuables" placeholder="物品摆放的分数">
                <template v-for="(item,index) in num">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="风 扇:">
              <el-select v-model="p_fan" placeholder="风扇的分数">
                <template v-for="(item,index) in num">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="电 灯:">
              <el-select v-model="p_lamp" placeholder="灯的分数">
                <template v-for="(item,index) in num">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="阳 台:">
              <el-select v-model="p_balcony" placeholder="阳台的分数">
                <template v-for="(item,index) in num">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="烟 头:">
              <el-select v-model="p_smoke" placeholder="烟头的分数">
                <template v-for="(item,index) in num">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="水 电:">
              <el-select v-model="p_water_electricity" placeholder="水电的分数">
                <template v-for="(item,index) in num">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="地 板:">
              <el-select v-model="p_floor" placeholder="地板的分数">
                <template v-for="(item,index) in num">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="垃圾桶:">
              <el-select v-model="p_dustbin" placeholder="垃圾桶的分数">
                <template v-for="(item,index) in num">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="厕 所:">
              <el-select v-model="p_toilet" placeholder="厕所的分数">
                <template v-for="(item,index) in num">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
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
      <el-dialog  title="修改" :visible.sync="dialogFormVisible1">
        <div class="block">
          <el-form>
            <el-form-item label="床 :">
              <el-select v-model="p_bed" placeholder="床的分数">
                <template v-for="(item,index) in num1">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="物品摆放:">
              <el-select v-model="p_valuables" placeholder="物品摆放的分数">
                <template v-for="(item,index) in num1">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="风 扇:">
              <el-select v-model="p_fan" placeholder="风扇的分数">
                <template v-for="(item,index) in num1">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="电 灯:">
              <el-select v-model="p_lamp" placeholder="灯的分数">
                <template v-for="(item,index) in num1">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="阳 台:">
              <el-select v-model="p_balcony" placeholder="阳台的分数">
                <template v-for="(item,index) in num1">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="烟 头:">
              <el-select v-model="p_smoke" placeholder="烟头的分数">
                <template v-for="(item,index) in num1">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="水 电:">
              <el-select v-model="p_water_electricity" placeholder="水电的分数">
                <template v-for="(item,index) in num1">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="地 板:">
              <el-select v-model="p_floor" placeholder="地板的分数">
                <template v-for="(item,index) in num1">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="垃圾桶:">
              <el-select v-model="p_dustbin" placeholder="垃圾桶的分数">
                <template v-for="(item,index) in num1">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="厕 所:">
              <el-select v-model="p_toilet" placeholder="厕所的分数">
                <template v-for="(item,index) in num1">
                  <el-option :key="index" :label="item" :value="index"/>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
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
        :data="inspect"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="of"
          label="所属全称"
        />
        <el-table-column
          prop="dormitory_name"
          label="宿舍"
        />
        <el-table-column label="宿舍 居住人数/可居住人数">
          <template slot-scope="scope">
            <span>{{ scope.row.live_number }}/{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="principal"
          label="宿舍长电话"
        />
        <el-table-column
          label="总分"
          sortable
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.total >= 90" effect="dark" type="success">
              {{ scope.row.total }}
            </el-tag>
            <el-tag v-else-if="scope.row.total >= 60" effect="dark">
              {{ scope.row.total }}
            </el-tag>
            <el-tag v-else effect="dark" type="danger">
              {{ scope.row.total }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
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
              @click="handleUpdata(scope.row.id,scope.row.bed,scope.row.dustbin,scope.row.fan,scope.row.lamp,scope.row.balcony,scope.row.smoke,scope.row.water_electricity,scope.row.floor,scope.row.valuables,scope.row.toilet)"
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
  name: 'Inspect',
  data () {
    return {
      value: [],
      inspect: [],
      floordata: [],
      dormitorydata: [],
      dormitory: null,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      formLabelWidth: '120px',
      num: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
      num1: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      p_id: null,
      p_bed: null,
      p_dustbin: null,
      p_fan: null,
      p_lamp: null,
      p_balcony: null,
      p_smoke: null,
      p_water_electricity: null,
      p_floor: null,
      p_valuables: null,
      p_toilet: null
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
        this.p_id = this.p_bed = this.p_dustbin = this.p_fan = this.p_balcony = this.p_lamp = this.p_smoke = this.p_water_electricity = this.p_floor = this.p_valuables = this.p_toilet = ''
      }
    }
  },
  created () {
    this.getinspect()
  },
  methods: {
    getinspect () {
      this.$axios.post('api/api/dormitory/inspect').then((res) => {
        this.inspect = res.data.data.rows
        this.inspect.reverse()
      })
      // 楼层
      this.$axios.get('api/api/of/selectpage').then((res) => {
        this.floordata = res.data.data.rows
      })
    },
    handleUpdata (id, bed, dustbin, fan, lamp, balcony, smoke, waterelectricity, floor, valuables, toilet) {
      this.dialogFormVisible1 = true
      this.p_id = id
      this.p_bed = bed
      this.p_dustbin = dustbin
      this.p_fan = fan
      this.p_balcony = balcony
      this.p_lamp = lamp
      this.p_smoke = smoke
      this.p_water_electricity = waterelectricity
      this.p_floor = floor
      this.p_valuables = valuables
      this.p_toilet = toilet
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
    },
    submit1 () {
      if (this.p_id && this.p_bed && this.p_dustbin && this.p_fan && this.p_balcony && this.p_lamp && this.p_smoke && this.p_water_electricity && this.p_floor && this.p_valuables && this.p_toilet) {
        this.$axios.post('api/api/dormitory/inspect_edit', {
          'row[id]': this.p_id,
          'row[bed]': this.p_bed,
          'row[dustbin]': this.p_dustbin,
          'row[fan]': this.p_fan,
          'row[lamp]': this.p_lamp,
          'row[balcony]': this.p_balcony,
          'row[smoke]': this.p_smoke,
          'row[water_electricity]': this.p_water_electricity,
          'row[floor]': this.p_floor,
          'row[valuables]': this.p_valuables,
          'row[toilet]': this.p_toilet
        }).then((res) => {
          if (res.data.code === 200) {
            this.dialogFormVisible1 = false
            this.getinspect()
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
      if (this.dormitory !== null && this.p_bed !== null && this.p_dustbin !== null && this.p_fan !== null && this.p_lamp !== null && this.p_balcony !== null && this.p_smoke !== null && this.p_water_electricity !== null && this.p_floor !== null && this.p_valuables !== null && this.p_toilet !== null) {
        this.$axios.post('api/api/dormitory/inspect_add', {
          dormitory_id: this.dormitory,
          bed: this.p_bed,
          dustbin: this.p_dustbin,
          fan: this.p_fan,
          lamp: this.p_lamp,
          balcony: this.p_balcony,
          smoke: this.p_smoke,
          water_electricity: this.p_water_electricity,
          floor: this.p_floor,
          valuables: this.p_valuables,
          toilet: this.p_toilet,
          image: ''
        }).then((res) => {
          if (res.data.code === 200) {
            this.dialogFormVisible = false
            // 清空选择值
            this.dormitory = this.p_bed = this.p_dustbin = this.p_fan = this.p_lamp = this.p_balcony = this.p_smoke = this.p_water_electricity = this.p_floor = this.p_valuables = this.p_toilet = ''
            this.getinspect()
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
.inspect {
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
    /deep/.el-dialog__body{
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .el-form-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .block {
        width: 50%;
        margin: 10px 0;
      }
    }
  }
}
</style>
