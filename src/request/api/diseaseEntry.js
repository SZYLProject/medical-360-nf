import { post } from '../http'
const diseaseEntry = {
  apiGetDepartmentToolsSelect: p => post('/v1/departmentToolsSelect', p),
  apiPostAtientTableSelect: p => post('/v1/patientTableSelectAll', p)
}

export default diseaseEntry
