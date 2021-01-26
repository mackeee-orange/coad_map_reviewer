import { SERVER_ERROR, SET_PAGE_TITLE, TOGGLE_MENU } from '../constants/actionTypes'

export const setPageTitle = pageTitle => ({
  type: SET_PAGE_TITLE,
  payload: pageTitle,
})

export const setServerError = () => ({
  type: SERVER_ERROR,
})

export const toggleMenu = () => ({
  type: TOGGLE_MENU,
})
