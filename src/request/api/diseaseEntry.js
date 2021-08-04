import { post } from '../http'
const diseaseEntry = {
  apiGetDepartmentToolsSelect: p => post('/v1/departmentToolsSelect', p),
  apiPostAtientTableSelect: p =>
    post(
      `/v1/patientTableSelectAll?pageNo=${p.pageNo}&pageSize=${p.pageSize}`,
      p
    )
}

export default diseaseEntry
