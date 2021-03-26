import Vue from 'vue'
import TYPES from '../type'
import { zoom } from '@/utils/animate'
// import router from '@/router/index'
import currentScience from '@/config'

let preType
const mutations = {
  [TYPES.ONADDChILDFILTER] (state, v) {
    const obj = { theme: '', condition: '', range: '' }
    state.searchFilters[v].children.push(obj)
  },
  [TYPES.ONDELCHILDFLITER] (state, { index, idx }) {
    state.searchFilters[index].children.splice(idx, 1)
  },
  [TYPES.ONADDFLITER] (state) {
    const obj = { relation: '', theme: '', condition: '', range: '', children: [] }
    state.searchFilters.push(obj)
    console.warn(state.searchFilters)
  },
  [TYPES.ONDELFLITER] (state, index) {
    state.searchFilters.splice(index, 1)
  },
  [TYPES.SETDISEASEINFOSELECTDATA] (state, v) {
    console.log(v)
    state.diseaseInfoSelectData = v
    // state.diseaseInfoSelectData.diseaseInfo = v
    state.diseaseInfoSelectData.displyTreatments = v.displyTreatments
    state.diseaseInfoSelectData.finished = true
    state.diseaseInfoSelectData.basicInfoModel = v.basicInfoModel
    state.diseaseInfoSelectData.pathologyInfo = v.pathologyInfo
    state.diseaseInfoSelectData.vtaurants = v.vtaurants
    state.diseaseInfoSelectData.chartData = v.chartData
    state.diseaseInfoSelectData.chartList = v.chartList
  },
  [TYPES.FULLSCREENLOADING] (state, v) {
    Vue.set(state.diseaseInfoSelectData, 'fullscreenLoading', v)
  },
  [TYPES.SETFINISHED] (state, v) {
    Vue.set(state.diseaseInfoSelectData, 'finished', true)
  },
  [TYPES.ONSHOWTOAST] (state, obj) {
    // if (obj.parentIndex === 3 || obj.parentIndex === 4) return
    state.dialogShow = true
    if (obj.isSearch) {
      state.themeObj = { ...obj }
      state.componentForm = 'FormDialog'
    } else {
      const diseaseInfoModel = JSON.parse(localStorage.getItem('diseaseInfoModel'))
      state.componentForm = 'FormDialogEdit'
      state.dialogTitle = diseaseInfoModel[obj.childIndex].disease_info_title
      let vultArr = []
      const recursiveArr = function (arr) {
        if (Array.isArray(arr)) {
          arr.forEach(ele => {
            if (ele.children && Array.isArray(ele.children)) {
              return recursiveArr(ele.children)
            } else {
              vultArr.push(ele)
            }
          })
        } else {
          vultArr = []
        }
      }
      recursiveArr(diseaseInfoModel[obj.childIndex].children)
      vultArr.map((ele, index, array) => {
        if (ele.multiselect === 1) {
          const arrm = (ele.disease_info_title_value ? ele.disease_info_title_value : '').split(',')
          array[index].smoveList = arrm.filter((e) => {
            return e
          })
        }
        if (ele.disease_info_title === 'ECOG-PS评分') {
          state.publicInfoModel = ele.publicInfoModel
          ele.publicInfoModel.map((opt) => {
            if (opt.public_info_title === ele.disease_info_title_value) {
              state.optionTip = opt.public_info_title_value
            }
          })
        }
      })
      state.formItems = vultArr
      console.log(vultArr)
    }
  },
  [TYPES.ONCHANGEOPTION] (state, v) {
    state.publicInfoModel.map((opt) => {
      if (opt.public_info_title === v) {
        state.optionTip = opt.public_info_title_value
      }
    })
  },
  [TYPES.CLOSEDIALOG] (state) {
    state.dialogShow = false
    state.activeName = '0'
  },
  [TYPES.ONADDSEARCHITEM] (state) {
    state.dialogShow = false
    if (state.themeObj.isParent) {
      state.searchFilters[state.themeObj.parentIndex].theme = state.searchDialogForm.theme
    } else {
      state.searchFilters[state.themeObj.parentIndex].children[state.themeObj.childIndex].theme = state.searchDialogForm.theme
    }
  },
  [TYPES.SETDRAWERDOM] (state, v) {
    state.drawerDom = v
  },
  [TYPES.SETSUBMITLOADING] (state, v) {
    state.submitLoading = v
  },
  /**
     * onShoworCloseDrawer : 显示/隐藏抽屉
     * params type（1：方案推荐、2：相似病例、3：文案检索、0：关闭）
    */
  [TYPES.ONSHOWORCLOSEDRAWER] (state, { drawer, type = 1 }) {
    if (type === 4) {
      // router.push('DiseaseDetail360History')
      const patientId = localStorage.getItem('patientId')
      window.open(`${currentScience.jumpUrl}?patientId=${patientId}`, '_blank')
      return
    }
    state.screenWidth = document.body.clientWidth
    state.drawer = true
    if (type !== 0) {
      state.defaultTab = type - 1
    }
    let stap = 22
    switch (type) {
      case 1:
        state.draweWidth = parseInt(state.screenWidth * 0.4)
        stap = 22
        state.componentDefault = 'SchemeRecommendation'
        break
      case 2:
        state.draweWidth = parseInt(state.screenWidth * 9 / 10)
        stap = 40
        state.componentDefault = 'SimilarCases'
        preType = type
        break
      case 3:
        state.componentDefault = 'DocumentRetrieval'
        state.draweWidth = parseInt(state.screenWidth * 0.4)
        stap = 22
        break
      case 4:
        state.componentDefault = 'FollowUp'
        state.draweWidth = parseInt(state.screenWidth * 0.26)
        stap = 22
        break
      case 5:
        state.componentDefault = 'FollowUp'
        state.draweWidth = parseInt(state.screenWidth * 0.26)
        stap = 22
        break
      default:
        break
    }
    if (type === 0 && preType === 2) {
      stap = 60
    }
    zoom(stap, state.drawerDom, 'width', state.draweWidth, 10, type)
  }
}
export default mutations
