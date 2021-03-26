<template>
  <div class="dise-360-wrap" v-loading="diseaseInfoSelectData.fullscreenLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-color = '#fff' element-loading-background="rgba(0, 0, 0, 0.3)">
      <!-- <div class="patient-info-wrap">
        <PatientInfo :basicInfoModel = 'diseaseInfoSelectData.basicInfoModel'></PatientInfo>
      </div> -->
      <div class="pathology-info-wrap" >
        <!-- <PathologyInfo v-if = '!diseaseInfoSelectData.fullscreenLoading && diseaseInfoSelectData.diseaseInfo' :diseaseInfo = 'diseaseInfoSelectData.diseaseInfo' class="pathology-info-content-wrap" :pathologyInfo = 'diseaseInfoSelectData.pathologyInfo'></PathologyInfo> -->
        <Empty v-if = '!diseaseInfoSelectData.fullscreenLoading && !diseaseInfoSelectData.diseaseInfo' ></Empty>
        <div ref="fixedWrap" id ='right-fixed-wrap' class="right-fixed-wrap" @mouseenter="onMouseLeaveEnter(1)" @mouseleave="onMouseLeaveEnter(0)" style="right:-60px;">
          <p @click="ONSHOWORCLOSEDRAWER({drawer:$refs.drawer,type:index+1})" v-for="(tab, index) in rightDraweTabs" :key="index" class="select-tab" :style="{top:`${10+60*index}px`}"><i :class="tab.icon"></i><span>{{tab.title}}</span></p>
        </div>
      </div>
      <el-dialog width = '80%' :title="dialogTitle" :visible="dialogShow" v-on:update:visible="$emit('update:visible ',false)" @close='CLOSEDIALOG'>
        <component :is="componentForm"></component>
      </el-dialog>
      <div ref="drawer" class="drawer-wrap" :class="[drawer?'drawerDefault':'']">
          <div v-if="drawer" class="drawer-ctn">
            <div class = 'drawer-title-wrap shadow'>
              <h4>{{rightDraweTabs[defaultTab].title}}</h4><i class="el-icon-close" @click="ONSHOWORCLOSEDRAWER({drawer:$refs.drawer,type:0})"></i>
            </div>
            <div class="drawer-content-wrap shadow">
              <component :searchDialogForm = 'searchDialogForm' :chartData = 'diseaseInfoSelectData.chartData' :chartList = 'diseaseInfoSelectData.chartList' :screenWidth = 'screenWidth' :is="componentDefault" :displyTreatments = 'diseaseInfoSelectData.displyTreatments' :finished = 'diseaseInfoSelectData.finished' :restaurants = 'diseaseInfoSelectData.restaurants'></component>
            </div>
          </div>
        </div>
        <!-- <div v-drag class="iframe-wrap" :style="{width:style.width,height:style.height}" ref="ifwap">
          <div class="drag-wrap">智能CDSS</div>
          <iframe src="http://localhost:8090/cdss.html#/" frameborder="0" ></iframe>
        </div> -->
  </div>
</template>

<script>
import PatientInfo from '@/components/Disease360/PatientInfo'
import FormDialog from '@/components/Disease360/FormDialog'
import FormDialogEdit from '@/components/Disease360/FormDialogEdit'
import PathologyInfo from '@/components/Disease360/PathologyInfo'
import SchemeRecommendation from '@/components/Disease360/SchemeRecommendation'
import SimilarCases from '@/components/Disease360/SimilarCases'
import DocumentRetrieval from '@/components/Disease360/DocumentRetrieval'
import { Button, Collapse, Loading, CheckboxGroup, Checkbox } from 'element-ui'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    PatientInfo,
    FormDialog,
    FormDialogEdit,
    PathologyInfo,
    SchemeRecommendation,
    SimilarCases,
    DocumentRetrieval,
    [Button.name]: Button,
    [Collapse.name]: Collapse,
    [Loading.name]: Loading,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox
  },
  data () {
    return {
      diseaseInfo: {},
      rightDraweTabs: [
        { title: '方案推荐', icon: 'el-icon-s-cooperation' },
        { title: '相似病例', icon: 'el-icon-s-claim' },
        { title: '文献检索', icon: 'el-icon-s-finance' },
        { title: '全景图', icon: 'el-icon-time' }
      ],
      basicInfoModel: {},
      pathologyInfo: {
      },
      chartData: { dataBJ: [], dataGZ: [], dataSH: [], schema: [] },
      chartList: [],
      style: {
        width: '30%',
        height: '80%'
      }
    }
  },
  computed: {
    ...mapState({
      dialogShow: state => state.disease360.dialogShow,
      searchDialogForm: state => state.disease360.searchDialogForm,
      componentForm: state => state.disease360.componentForm,
      dialogTitle: state => state.disease360.dialogTitle,
      diseaseInfoSelectData: state => state.disease360.diseaseInfoSelectData,
      drawer: state => state.disease360.drawer,
      screenWidth: state => state.disease360.screenWidth,
      componentDefault: state => state.disease360.componentDefault,
      defaultTab: state => state.disease360.defaultTab
    })
  },
  mounted () {
    this.$store.commit('disease360/SETDRAWERDOM', this.$refs.drawer)
    this.$store.dispatch('disease360/apiGetDiseaseInfoSelectHCForm', { drawer: this.$refs.drawer })
    window.addEventListener('message', this.receiveMessageFromIframePage, false)
  },
  methods: {
    receiveMessageFromIframePage (event) {
      event.stopPropagation()
      if (event.data && event.data.data) {
        console.log(event.data.data)
        // do somthing, you want to do
        switch (event.data.data) {
          case 'EditDieaseMessage':
            this.style.width = '60%'
            break
          case 'CDSSChart':
            this.style.width = '80%'
            break
          case 'Literature':
            this.style.width = '40%'
            break
          default:
            this.style.width = '30%'
            break
        }
      }
    },
    ...mapMutations(
      {
        CLOSEDIALOG: 'disease360/CLOSEDIALOG',
        ONADDSEARCHITEM: 'disease360/ONADDSEARCHITEM',
        ONSHOWORCLOSEDRAWER: 'disease360/ONSHOWORCLOSEDRAWER'
      }
    ),
    /**
     * onMouseLeaveEnter: 鼠标移入移出
     * params val(0:移出，1:移入)
    */
    onMouseLeaveEnter (val) {
      const element = this.$('#right-fixed-wrap')
      if (val === 1) {
        element.stop().animate({
          right: '0px'
        })
      } else {
        element.stop().animate({
          right: '-60px'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$theme-clor:#2b86b2;
$xjTheme-clor:rgb(69,125,124);
$xjTheme-border-clor:rgb(126,168,215);
$Title-clor:rgb(20, 100, 152);

.dise-360-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  overflow-y: scroll;
  .iframe-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 30%;
    height: 80%;
    margin: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    display: flex;
    flex-direction: column;
    .drag-wrap {
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      padding: 30px 0;
      background-color: #23354b;
      color: #fff;
      cursor: move;
    }
    iframe{
      flex: 1;
      width: 100%;
      height: 100%;
    }

  }
    .drawer-wrap {
        position: fixed;
        right: 40px;
        top: 0px;
        bottom: 2px;
        width: 0;
        border-color: $Title-clor;
        z-index: 22;
        box-sizing: border-box;
        background-color: rgb(242,244,245);
        box-sizing: border-box;
        .drawer-ctn {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .drawer-content-wrap {
          background-color: rgb(242,244,245);
          flex: 1;
          overflow-y: scroll;
        }
          .drawer-title-wrap {
            height: 60px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            i {
              width: 30px;
              line-height: 30px;
              font-size: 20px;
            }
            h4 {
              padding-left: 20px;
              flex: 1;
              font-size: 18px;
              color: #303133;
              font-weight: 900;
            }
          }
        }
    .patient-info-wrap {
      height: 60px;
    }
    .pathology-info-wrap {
      margin-top: 2px;
      flex: 1;
      position: relative;
      display: flex;
      overflow-y: hidden;
      padding:0 10px;
      padding-bottom: 20px;
    }
    .right-fixed-wrap {
      position: fixed;
      top: 0px;
      width: 100px;
      bottom: 0;
      height: 100%;
      z-index: 1000;
      // background-color: #23354b;
      background:#2b86b2;
      cursor: pointer;
      i {
        width: 30px;
        line-height: 30px;
        font-size: 20px;
      }
      span{
        font-size: 12px;
      }
      .select-tab {
        line-height: 40px;
        background-color:  #2b86b2;
        color: $xjTheme-clor;
        padding: 0 10px;
        margin-bottom: 20px;
        text-align: center;
        position: absolute;
        z-index: 22;
        left: 0;
        top: 70px;
        color: #ccc;
        text-align: center;
        display: flex;
        align-items: center;
        // &:first-of-type{
        //   top: 10px;
        // }
        // &:last-of-type{
        //   top: 130px;
        // }
        &:hover {
          color: #fff;
          span{
            font-weight: 900;
          }
        }
      }
    }
    .pathology-info-content-wrap {
      flex: 1;
      padding-right: 40px;
      box-sizing: border-box;
    }
  }
  /deep/ .el-loading-spinner {
    p ,i{
    color: #23354b;
    font-size: 14px;
    }
}
</style>
