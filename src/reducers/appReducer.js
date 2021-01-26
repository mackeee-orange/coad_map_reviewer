import {
  SERVER_ERROR,
  SET_PAGE_TITLE,
  SIGN_OUT,
  START_LOADING,
  STOP_LOADING,
  TOGGLE_MENU,
} from '../constants/actionTypes'
import { notification } from 'antd'

const DEFAULT_STATE = {
  isLoading: false,
  pageTitle: '',
  isMenuCollapsed: true,
  selectedDate: new Date(),
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case STOP_LOADING:
      return { ...state, isLoading: false }
    case SET_PAGE_TITLE:
      return { ...state, pageTitle: action.payload }
    case TOGGLE_MENU:
      return { ...state, isMenuCollapsed: !state.isMenuCollapsed }
    case SERVER_ERROR:
      notification.error({ message: 'サーバーエラー、運営の対応をお待ちください' })
      return state
    case SIGN_OUT:
      return DEFAULT_STATE
    default:
      return state
  }
}
