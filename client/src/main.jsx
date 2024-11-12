import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AccountContextProvider } from './contexts/AccountContext'
import { MainContextProvider } from './contexts/MainContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContextProvider>
      <AccountContextProvider>
        <App />
      </AccountContextProvider>
    </MainContextProvider>
  </StrictMode>,
)
