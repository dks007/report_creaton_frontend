import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import { CustomNavigationClient } from './utils/NavigationClient'
import AppRoutes from './routes/AppRoutes'
import React from 'react'
import './assets/scss/styles.scss'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme/theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const MainContent = () => {
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
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </MsalProvider>
  )
}

export default App
