import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import reduxThunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import createRootReducer from './reducers/indexReducer'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default history => {
  const store = createStore(
    createRootReducer(history),
    composeEnhancer(applyMiddleware(reduxThunk, routerMiddleware(history)))
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
