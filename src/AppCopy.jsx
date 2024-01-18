import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'
import { CustomNavigationClient } from './utils/NavigationClient'
import React from 'react'
import './assets/scss/styles.scss'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme/theme'
import AppRoutesCopy from './routes/AppRouteCopy'

const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>{null}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <AppRoutesCopy />
      </UnauthenticatedTemplate>
    </div>
  )
}

const AppCopy = ({ instance }) => {
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

export default AppCopy
