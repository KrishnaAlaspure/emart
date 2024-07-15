import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import appRoute from './routes/route.jsx'
import {Provider} from 'react-redux'
import { store } from './reduxStore/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={appRoute}/>
    </Provider>
  </React.StrictMode>,
)
