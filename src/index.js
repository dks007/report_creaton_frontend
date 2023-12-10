import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { PublicClientApplication, EventType } from '@azure/msal-browser'
import 'bootstrap/dist/css/bootstrap.min.css'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/system'
import App from './App'
import { msalConfig } from './config/authConfig'
import store from './redux/store/store'

// MSAL should be instantiated outside of the component tree to prevent re-instantiation on re-renders.
const msalInstance = new PublicClientApplication(msalConfig)

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0])
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account
    msalInstance.setActiveAccount(account)
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))

const AppWithRouter = (
  <Router>
    <Provider store={store}>
      <App instance={msalInstance} />
    </Provider>
  </Router>
)

const AppWithHelmet = <HelmetProvider>{AppWithRouter}</HelmetProvider>

root.render(AppWithHelmet)
