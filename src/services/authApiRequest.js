import axios from 'axios'
import { AUTH_API_ROOT } from '../constants/url'

export const postSignUp = params => {
  delete axios.defaults.headers.common['Authorization']
  return axios.post(`${AUTH_API_ROOT}/sign_up`, params)
}
export const postSignIn = params => {
  delete axios.defaults.headers.common['Authorization']
  return axios.post(`${AUTH_API_ROOT}/sign_in`, params)
}
