import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import { CustomNavigationClient } from './utils/NavigationClient'
import AppRoutes from './routes/AppRoutes'
import React from 'react'
import './assets/scss/styles.scss'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme/theme'

const MainContent = () => {
  const { instance } = useMsal()

  return (
    <div className="App">
      <AuthenticatedTemplate>
        <AppRoutes />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Auth />
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainContent />
      </ThemeProvider>
    </MsalProvider>
  )
}

export default App
