import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { PersistGate } from 'redux-persist/integration/react'
import Router from '../routes/Router'
import configureStore from '../store'

const history = createBrowserHistory()
const { store, persistor } = configureStore(history)

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history} />
    </PersistGate>
  </Provider>
)
