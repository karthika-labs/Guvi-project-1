import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ApiContextProvider } from './ApiContext'

createRoot(document.getElementById('root')).render(
  <ApiContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </ApiContextProvider>,
)
