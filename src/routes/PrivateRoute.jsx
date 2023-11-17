import React from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import { Navigate, Outlet } from 'react-router-dom'
import { routePath } from '../constants/routes'

const PrivateRoute = () => {
  const isAuthenticated = useIsAuthenticated()

  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={routePath.LOGIN} />
  )
}
export default PrivateRoute
