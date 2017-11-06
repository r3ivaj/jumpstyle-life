import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.react'
import { Provider } from 'react-redux'
import store from './redux/store'
import registerServiceWorker from './registerServiceWorker'
import Raven from 'raven-js'
import { sentryDSN } from './config'

Raven.config(sentryDSN).install()
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
