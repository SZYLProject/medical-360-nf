import { get, post } from '../http'
const diease360 = {
  apiAddress: p => get('/testing/restful', p),
  apiShopList: p => post('/v1/users/my_list/shop', p),
  // apiGetDiseaseInfoSelectHC: p => get('./mockNew.json'),
  apiGetCards: p => get('./card.json'),
  apiGetDepartmentToolsSelect: p => post('/v1/departmentToolsSelect', p),
  // apiGet360Detaol: p => get('./360detail.json'),
  apiGet360Detaol: p => post('/v1/diseaseInfoSelect', p),
  apiUpdateDiseaseInfo: p => post('/v1/updateDiseaseInfo', p),
  apiGetDiseaseInfoSelectHC: p => post('/v1/diseaseInfoSelect', p),
  apiGetPatientNumHospital: p => post('/v1/patientNumHospital', p) // 获取患者住院次数
}

export default diease360
