import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/request/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cdssData: {}
  },
  mutations: {
    setCDSSData (state, v) {
      state.cdssData = v
    }
  },
  actions: {
    apiGetDiseaseInfoSelectHCForm ({ commit }) {
      const query = {
        patient_id: localStorage.getItem('patientId'),
        num_hospital: localStorage.getItem('numHospital')
      }
      api.diease360.apiGetDiseaseInfoSelectHC(query).then(res => {
        if (res.status === '1') {
          Vue.prototype.$message.error(res.message)
        } else {
          commit('setCDSSData', res.data)
          localStorage.setItem('diseaseInfoModel', JSON.stringify(res.data.diseaseInfoModel))
        }
      }).catch((err) => {
        console.log(err)
        // this.fullscreenLoading = false
        // this.finished = true
      })
    }
  }
})
