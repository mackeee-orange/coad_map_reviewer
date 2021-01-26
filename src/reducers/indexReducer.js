import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { connectRouter } from 'connected-react-router'
import app from './appReducer'
import account from './accountReducer'

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['id', 'authToken'],
}

export default history =>
  combineReducers({
    router: connectRouter(history),
    account: persistReducer(authPersistConfig, account),
    app,
  })
