import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './context/user.context.jsx'

import "react-toastify/dist/ReactToastify.css"
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
    <ToastContainer />
  </>,
)
