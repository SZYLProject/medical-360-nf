<template>
  <div class="similar-case-wrap">
    <el-tabs v-model="activeName" @tab-click="onTabClick">
      <el-tab-pane label="列表展示" name="list">
        <div class="chart-wrap list-wrap shadow">
          <SearchChartTable
            :tableData="tableData"
            :HeaderData="HeaderData"
            @onDetail="onDetail"
          ></SearchChartTable>
        </div>
      </el-tab-pane>
      <el-tab-pane label="图表展示" name="chart">
        <div class="chart-wrap chart-wrap-content shadow">
          <div class="search-wrap">
            <span>{{ changeTitle }}</span>
            <div>
              <i
                @click="onChangeComponent({ val: 2, title: '高级检索' })"
                class="ld-icon"
              ></i>
              <i
                @click="onChangeComponent({ val: 3, title: 'AI检索' })"
                class="ai-icon"
              ></i>
            </div>
          </div>
          <div
            v-show="isShowEchart === 1"
            id="myChart"
            :style="{ width: `${screenWidth * 0.8}px`, height: '300px' }"
          ></div>
          <div v-show="isShowEchart === 2" class="form-wrap">
            <RetrievalForm
              :form="form"
              :relaOptions="relaOptions"
              :relationFilter="relationFilter"
              :range="range"
              @onSubmit="onSubmit"
              :filtersData="filtersData"
              :searchFilters="searchFilters"
            ></RetrievalForm>
          </div>
          <div v-show="isShowEchart === 3" class="form-wrap">
            <AISearchGroup
              @onChangeComponent="onChangeComponent"
            ></AISearchGroup>
          </div>
          <div class="doughnut-wrap shadow">
            <div class="doughnut-top-wrap">
              <p><span>发现42个病人</span><span>共计3203(1.01%)</span></p>
            </div>
            <div class="chart-pie-wrap">
              <div
                class="d-chart-wrap"
                v-for="(chart, index) in chartList"
                :key="index"
              >
                <div
                  :id="'doughnutChart' + index"
                  :style="{
                    width: `${screenWidth * 0.8 * 0.25}px`,
                    height: '400px'
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="mask-wrap shadow" v-show="dialogTableVisible">
      <p>
        <span>{{ patientName }}的治疗方案：系统治疗</span
        ><i class="el-icon-error" @click="dialogTableVisible = false"></i>
      </p>
      <div class="collapse-wrap">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="系统治疗：分子靶向治疗" name="1">
            <div>一线治疗：索拉菲尼or 仑伐替尼。二线治疗：瑞戈非尼</div>
            <div>
              索拉菲尼：常规推荐用法为400mg，口服，bid，用于Child
              Pugh=A级或B级，注意对HBV和肝功能的影响；仑伐替尼：用法为体质量≥60kg
              者，12mg，口服，每日 1 次；者，8mg，口服，每日 1 次，用于肝功能
              Child-Pugh A 级的肝癌病人。瑞戈非尼：用法为 160mg，每日 1 次，连用
              3 周，停用 1 周。在我国，初始剂量可采用一次 80mg 或 120mg，每日 1
              次，根据病人的耐受情况逐渐增量
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { Table, Form } from 'element-ui'
import SearchChartTable from './SearchChartTable'
import RetrievalForm from './RetrievalForm'
import AISearchGroup from './AISearchGroup'
import diease360 from '@/request/api/disease360'
// import api from '@/request/index'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    [Table.name]: Table,
    [Form.name]: Form,
    SearchChartTable,
    RetrievalForm,
    AISearchGroup
  },
  props: {
    screenWidth: {
      type: Number
    },
    searchDialogForm: {
      type: Object
    }
  },
  data () {
    return {
      changeTitle: '病人筛选结果',
      activeNames: ['1'],
      dialogTableVisible: false,
      patientName: '',
      relaOptions: ['<', '=', '>'],
      relationFilter: ['且', '或', '非'],
      range: ['T3NIM0~T3NIM02', 'T3NIM2~T3NIM03'],
      filtersData: ['搜索关系', '搜索主题', '搜索条件', '值域范围'],
      isShowEchart: 1,
      advancedSearchForm: {},
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      activeName: 'list',
      HeaderData: [
        {
          label: '编码',
          key: 'code'
        },
        {
          label: '姓名',
          key: 'name'
        },
        {
          label: '权限描述',
          key: 'description'
        }
      ],
      tableData: [
        {
          id: 221,
          code: '01',
          name: '西药开立权限',
          description: '医生对西药处方权限',
          ifUse: '0'
        },
        {
          id: 222,
          code: '02',
          name: '草药开立权限',
          description: '医生对草药处方权限',
          ifUse: '0'
        },
        {
          id: 223,
          code: '03',
          name: '成药开立权限',
          description: '医生对成药处方权限',
          ifUse: '0'
        },
        {
          id: 224,
          code: '04',
          name: '麻醉开立权限',
          description: '医生对麻醉处方权限',
          ifUse: '0'
        },
        {
          id: 225,
          code: '05',
          name: '精一开立权限',
          description: '医生对精一处方权限',
          ifUse: '0'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      searchFilters: state => state.disease360.searchFilters,
      chartData: state => state.disease360.chartData,
      chartList: state => state.disease360.chartList
    })
  },
  mounted () {
    this.initData()
    this.chartList.forEach((chart, index) => {
      this.chartPieInit(chart, index)
    })
    console.log(this.screenWidth)
    this.similarityCase()
    this.getSimilarityEntity()
  },
  methods: {
    similarityCase () {
      const param = {
        patient_id: localStorage.getItem('patientId'),
        num_hospital: localStorage.getItem('numHospital'),
        disease_name: localStorage.getItem('disease_name')
      }
      diease360
        .similarityCase(param)
        .then(res => {
          this.tableData = res.data

          this.tableData.forEach(element => {
            if (element.scop) {
              element.scop = element.scop + '%'
            }
          })
        })
        .catch(err => {
          console.log()
        })
    },
    getSimilarityEntity () {
      const param = {
        patient_id: localStorage.getItem('patientId'),
        num_hospital: localStorage.getItem('numHospital'),
        disease_name: localStorage.getItem('disease_name')
      }
      diease360
        .getSimilarityEntity(param)
        .then(res => {
          this.HeaderData = res.data.map(item => {
            return {
              label: item?.disease_info_title || '',
              key: item?.disease_info_title || ''
            }
          })
          this.HeaderData.unshift({
            label: '患者ID',
            key: '患者ID'
          })
          this.HeaderData.push({
            label: '相似度',
            key: 'scop'
          })
          // console.log(res, 'res')
        })
        .catch(err => {
          console.log()
        })
    },
    onShowToast (i) {
      this.$emit('onShowToast', i)
    },
    onChangeComponent ({ val, title, selectitem = {} }) {
      this.isShowEchart = val
      this.changeTitle = title
      if (selectitem.title) {
        console.warn(selectitem)
        const arr = []
        selectitem.children.forEach(ele => {
          arr.push({ title: ele })
        })
        this.chartData.schema = arr
        this.initData()
      }
    },
    handleChange (val) {
      console.log(val)
    },
    onDetail (val) {
      // console.log(val, 'val')
      // this.patientName = val.name
      // this.$router.push({
      //   path: 'DiseaseList/DiseaseDetail360',
      //   query: { disease_name: localStorage.getItem('disease_name') }
      // })

      const routeUrl = this.$router.resolve({
        path: 'DiseaseDetail360',
        query: { disease_name: localStorage.getItem('disease_name') }
      })
      console.log(val, 'bvalva')
      localStorage.patientId = val.患者ID
      window.open(routeUrl.href, '_blank')

      // this.dialogTableVisible = true
    },
    ...mapMutations({
      ONADDChILDFILTER: 'disease360/ONADDChILDFILTER',
      ONDELFLITER: 'disease360/ONDELFLITER'
    }),
    onSubmit () {
      this.onChangeComponent({ val: 1, title: '病人筛选结果' })
    },
    onTabClick (tab, event) {
      this.activeName = tab.name
    },
    initData () {
      const mcolors = ['rgba(0,0,0,0.1)', '#409EFF', 'rgb(141,176,243)']
      var schema = this.chartData.schema
      var dataBJ = this.chartData.dataBJ
      var dataGZ = this.chartData.dataGZ
      var dataSH = this.chartData.dataSH
      var option = {
        parallelAxis: [
          {
            dim: 0,
            name: schema[0].title,
            type: 'category',
            data: ['直肠', '结肠', '未知']
          },
          { dim: 1, name: schema[1].title },
          { dim: 2, name: schema[2].title },
          { dim: 3, name: schema[3].title },
          { dim: 4, name: schema[4].title },
          {
            dim: 5,
            name: schema[5].title,
            type: 'category',
            data: ['腺癌', '粘液癌', '小细胞癌', '其他']
          }
        ],
        parallel: {
          left: '5%',
          right: '13%',
          bottom: '10%',
          top: '20%',
          parallelAxisDefault: {
            type: 'value',
            name: 'postion',
            nameLocation: 'end',
            nameGap: 23,
            splitNumber: 4,
            nameTextStyle: {
              fontSize: 14,
              verticalAlign: 'bottom',
              color: '#333',
              padding: [3, 10]
            },
            axisLabel: {
              show: true,
              margin: 10,
              // color: '#409EFF',
              align: 'center',
              zlevel: 2222,
              interval: false
            },
            axisLine: {
              lineStyle: {
                // color: '#409EFF',
                opacity: 1,
                zlevel: 1,
                width: 1
              },
              zlevel: 2
            },
            axisTick: {
              show: false,
              alignWithLabel: true,
              length: 20,
              lineStyle: {
                width: 1,
                color: 'red',
                rotate: 90
              }
            },
            minorTick: {
              show: false
            }
          }
        },
        series: [
          {
            name: 'persion',
            type: 'parallel',
            smooth: true,
            data: dataBJ,
            textStyle: {
              color: '#333'
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: mcolors[0],
                  opacity: 1
                }
              }
            }
          },
          {
            name: 'simple',
            type: 'parallel',
            smooth: true,
            data: dataSH,
            lineStyle: {
              color: mcolors[1],
              opacity: 1,
              width: 1
            }
          },
          {
            name: 'other',
            type: 'parallel',
            smooth: true,
            data: dataGZ,
            lineStyle: {
              color: mcolors[2],
              opacity: 1
            }
          }
        ]
      }
      this.chartInit(option)
    },
    chartInit (option) {
      // 基于准备好的dom，初始化echarts实例
      setTimeout(() => {
        const myChart = this.$echarts.init(document.getElementById('myChart'))
        myChart.setOption(option)
      }, 200)
    },
    chartPieInit (chart, index) {
      var myChart = this.$echarts.init(
        document.getElementById(`doughnutChart${index}`)
      )
      var option
      option = {
        color: ['red', 'green', 'gray', 'origin'],
        title: {
          text: chart.title,
          right: 'center'
        },
        legend: {
          orient: 'vertical',
          top: 40,
          left: 0,
          width: '40',
          selectedMode: false,
          data: chart.legend
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: [30, 45],
            hoverOffset: 2,
            avoidLabelOverlap: true,
            center: ['40%', '60%'],
            label: {
              show: true,
              position: 'left',
              formatter: '{d}%'
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: chart.data
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.similar-case-wrap {
  padding: 0 20px;
  height: 100%;
  overflow-y: auto;
  background: #fff;
  .mask-wrap {
    position: fixed;
    left: 30%;
    right: 30%;
    top: 15%;
    bottom: 40%;
    z-index: 2000;
    border-radius: 8px;
    background: #f2f4f5;
    padding: 20px;
    display: flex;
    flex-direction: column;
    p {
      font-size: 16px;
      font-weight: 800;
      height: 40px;
      display: flex;
      justify-content: space-between;
      i {
        font-size: 22px;
        margin-right: 20px;
      }
    }
    .collapse-wrap {
      overflow-y: auto;
      flex: 1;
      /deep/ .el-collapse-item__wrap {
        background: #f2f4f5;
      }
      /deep/ .el-collapse-item__header {
        background: #f2f4f5;
      }
    }
  }
  .chart-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // background: #f2f4f5;
    border-radius: 4px;
    .search-wrap {
      min-height: 40px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      border-bottom: 1px solid #fff;
      box-sizing: border-box;
      i,
      span {
        font-size: 18px;
        font-weight: 900;
      }
    }
  }
  .chart-wrap-content {
    .form-wrap {
      padding-left: 20px;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      background: #f2f4f5;
      padding-bottom: 30px;
      max-height: 370px;
      overflow-y: auto;
    }
    .doughnut-wrap {
      min-height: 400px;
      width: 100%;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      background: #fff;
      overflow-x: hidden;
      .doughnut-top-wrap {
        padding: 20px 0;
        span {
          font-size: 14px;
          font-weight: 600;
        }
      }
      .chart-pie-wrap {
        width: 100%;
        display: flex;
        overflow-x: auto;
        .d-chart-wrap {
          flex: 1;
          width: 25%;
          border-right: 1px solid #ccc;
          padding-left: 30px;
          &:first-of-type {
            padding-left: 0;
          }
          &:last-of-type {
            border: none;
          }
        }
      }
    }
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 10px;
    }
    .ld-icon {
      background: url('../../static/images/search.png') no-repeat;
      background-size: contain;
    }
    .ai-icon {
      background: url('../../static/images/AI.png') no-repeat;
      background-size: contain;
    }
  }
  .list-wrap {
    height: 80%;
    background-color: #fff;
  }
}
</style>
