import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import reportWebVitals from './reportWebVitals'
import App from './App'
import ScrolltoTop from './utils/ScrollToTop'
import { createBrowserHistory as createHistory } from 'history'

import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './index.css'

const store = configureStore()
const history = createHistory()

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router history={history}>
        <ScrolltoTop />
        <App />
      </Router>
    </Provider>
  </>,
  document.getElementById('root')
)

reportWebVitals()
