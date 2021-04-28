import {
  post,
  get
} from '../http'
const login = {
  apiPostUserLogin: p => post('/v1/userLogin', p),
  apiPostUserLogOut: p => get('/cas/logout', p)
}

export default login
