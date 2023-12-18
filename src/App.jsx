import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import { CustomNavigationClient } from './utils/NavigationClient'
import AppRoutes from './routes/AppRoutes'
import React from 'react'
import './assets/scss/styles.scss'

const MainContent = () => {
  const { instance } = useMsal()   
  //const activeAccount = instance.getActiveAccount()

  return (
    <div className="App">
      <AuthenticatedTemplate>{null}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <AppRoutes />
      </UnauthenticatedTemplate>
    </div>
  )
}

const App = ({ instance }) => {
  const navigate = useNavigate()
  const navigationClient = new CustomNavigationClient(navigate)
  instance.setNavigationClient(navigationClient)
  return (
    <MsalProvider instance={instance}>
      <MainContent />
    </MsalProvider>
  )
}

export default App
