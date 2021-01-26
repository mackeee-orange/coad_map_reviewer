import { notification } from 'antd'
import {
  getMyAccount,
  patchMyAccount,
  setAuthHeader,
} from '../services/v1ApiRequest'
import { postSignIn, postSignUp } from '../services/authApiRequest'
import {
  SET_ACCOUNT,
  SET_ACCOUNT_ERRORS,
  SIGN_IN_ACCOUNT,
  SIGN_OUT,
  START_LOADING,
  STOP_LOADING,
} from '../constants/actionTypes'
import { push } from 'connected-react-router'
import routes from '../routes'
import responseStatuses from '../constants/responseStatuses'
import Account from '../models/account'

export const fetchCurrentAccount = () => dispatch => {
  dispatch({ type: START_LOADING })
  return getMyAccount()
    .then(res => {
      return dispatch(setAccount(Account.newFromApiResponse(res.data)))
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status === responseStatuses.UNAUTHENTICATED) {
          forceLogout(dispatch)
        } else {
          dispatch(setErrors(e.response.data.errors))
        }
      } else {
        dispatch(setErrors(['responseを取得できませんでした']))
      }
    })
    .finally(() => {
      dispatch({ type: STOP_LOADING })
    })
}


export const signUp = formProps => dispatch => {
  dispatch({ type: START_LOADING })
  return postSignUp({ account: formProps })
    .then(res => {
      setAuthHeader(res.data.token)
      dispatch(signInAccount({ ...res.data.account, authToken: res.data.token }))
      dispatch(push(routes.home()))
      notification.success({ message: 'Register Success' })
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status === responseStatuses.UNAUTHENTICATED) {
          dispatch(setErrors([e.response.data.message]))
        }
      }
    })
    .finally(() => {
      dispatch({ type: STOP_LOADING })
    })
}

export const signIn = formProps => dispatch => {
  dispatch({ type: START_LOADING })
  return postSignIn({ account: formProps })
    .then(res => {
      setAuthHeader(res.data.token)
      dispatch(signInAccount({ ...res.data.account, authToken: res.data.token }))
      dispatch(push(routes.home()))
      notification.success({ message: 'Login Success' })
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status === responseStatuses.UNAUTHENTICATED) {
          dispatch(setErrors([e.response.data.message]))
        }
      }
    })
    .finally(() => {
      dispatch({ type: STOP_LOADING })
    })
}


const setAccount = user => ({
  type: SET_ACCOUNT,
  payload: { ...user, isLoggedIn: true, errors: [] },
})

const signInAccount = user => ({
  type: SIGN_IN_ACCOUNT,
  payload: { ...user, isLoggedIn: true, errors: [] },
})

const setErrors = errors => ({
  type: SET_ACCOUNT_ERRORS,
  payload: errors,
})

export const forceLogout = dispatch => {
  dispatch(signOut())
  notification.warning({ message: 'You need Login' })
  dispatch(push(routes.signIn()))
}

export const selfSignOut = () => dispatch => {
  dispatch(signOut())
  notification.success({ message: 'Logout Success' })
  dispatch(push(routes.top()))
}

export const signOut = () => ({
  type: SIGN_OUT,
})
