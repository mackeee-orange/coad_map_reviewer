import axios from 'axios'
import { API_ROOT } from '../constants/url'

const auth = JSON.parse(localStorage.getItem('persist:auth'))
if (auth) {
  if (auth.authToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.authToken.replace(/["]/g, '')
  }
}

export const setAuthHeader = authToken => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken
}

// APIリクエストであると明示するために、接頭辞にリクエストのタイプを付ける
// Account
export const getMyAccount = () => axios.get(`${API_ROOT}/accounts/me`)
export const patchMyAccount = params => axios.patch(`${API_ROOT}/accounts/me`, params)
