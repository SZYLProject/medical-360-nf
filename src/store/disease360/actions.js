import TYPES from '../type'
import api from '@/request/index'
import Vue from 'vue'
const actions = {
  async apiGetDiseaseInfoSelectHCForm ({ commit }, { drawer, query }) {
    let param = {}
    // console.log(query.split('&'))
    if (query.split('&').length > 1) {
      query.split('&').map((e) => {
        param[e.split('=')[0]] = e.split('=')[1]
      })
      localStorage.setItem('patientId', param.patient_id)
      await api.diease360.apiGetPatientNumHospital(param).then(res => {
        console.log(res)
        if (res.status === '0') {
          param.num_hospital = res.data
          desea()
        } else {
          Vue.prototype.$message.warning('无此患者～')
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      // console.log(localStorage.getItem('patientId'), localStorage.getItem('numHospital'))
      param = {
        patient_id: localStorage.getItem('patientId') || null,
        num_hospital: localStorage.getItem('numHospital') || null,
        disease_name: localStorage.getItem('disease_name')
      }
      desea()
    }
    //
    function desea () {
      commit(TYPES.FULLSCREENLOADING, true)
      commit(TYPES.SETFINISHED)
      api.diease360.apiGetDiseaseInfoSelectHC(param).then(res => {
        if (res.status === '1') {
          Vue.prototype.$message.error(res.message)
          commit(TYPES.FULLSCREENLOADING, false)
        } else {
          commit(TYPES.SETDISEASEINFOSELECTDATA, res.data)
          commit(TYPES.ONSHOWORCLOSEDRAWER, { drawer, type: 1 })
          localStorage.setItem('diseaseInfoModel', JSON.stringify(res.data.diseaseInfoModel))
        }
      }).catch((err) => {
        console.log(err)
        commit(TYPES.FULLSCREENLOADING, false)
        Vue.prototype.$message.error(JSON.stringify(err))
        // this.fullscreenLoading = false
        // this.finished = true
      })
    }
  },
  apiPostEdit (context, { query }) {
    context.commit(TYPES.SETSUBMITLOADING, true)
    const submitArr = [...context.state.formItems]
    submitArr.map((ele, index, array) => {
      const obj = {}
      obj.disease_info_title = ele.disease_info_title
      obj.disease_info_title_unit = ele.disease_info_title_unit
      if (Array.isArray(ele.smoveList)) {
        const arr = [...new Set(ele.smoveList)]
        const str = arr.join(',')
        obj.disease_info_title_value = str
      } else {
        obj.disease_info_title_value = ele.disease_info_title_value
      }
      array[index] = obj
    })
    let param = {}
    console.log(query.split('&'))
    if (query.split('&').length > 1) {
      query.split('&').map((e) => {
        param[e.split('=')[0]] = e.split('=')[1]
        param.diseaseInfoModel = submitArr
      })
    } else {
      param = {
        patient_id: localStorage.getItem('patientId'),
        num_hospital: localStorage.getItem('numHospital'),
        diseaseInfoModel: submitArr,
        disease_name: localStorage.getItem('disease_name')
      }
    }

    api.diease360.apiUpdateDiseaseInfo(param).then((res) => {
      if (res.status === '1') {
        Vue.prototype.$message.error(res.message)
        context.commit(TYPES.SETSUBMITLOADING, false)
      } else {
        context.commit(TYPES.SETSUBMITLOADING, false)
        context.commit(TYPES.CLOSEDIALOG)
        context.dispatch('apiGetDiseaseInfoSelectHCForm', { drawer: null, query })
        Vue.prototype.$message({
          message: '修改成功！',
          type: 'success'
        })
      }
    }).catch((err) => {
      console.log(err)
      context.commit(TYPES.CLOSEDIALOG)
      context.commit(TYPES.SETSUBMITLOADING, false)
    })
  }

}

export default actions
