import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routePath } from '../constants/routes'
import IssueDetailsPage from '../components/IssueListing/IssueDetailsPage'
import PageNotFound from '../pages/404/PageNotFound'
import Dashboard from '../pages/dashboard/Dashboard'
import SuccessAnalyzer from '../pages/success-analyzer/success-analyzer'
import LicenseAnalyzer from '../pages/license-analyzer/license-analyzer'

import AppLayout from '../layout/AppLayout'
import Report from '../pages/report/Report'
import { useMsal } from '@azure/msal-react'

const AppRoutes = () => {
  const { accounts, instance } = useMsal()
  const [name, setName] = useState('')

  useEffect(() => {
    if (accounts.length > 0) {
      const activeAccount = accounts[0]
      const { idTokenClaims } = activeAccount
      const request = {
        scopes: ['user.read'],
        account: activeAccount
      }
      const getTOken = async () => {
        const response = await instance.acquireTokenSilent(request)
        sessionStorage.setItem('authToken', response.accessToken)
        console.log('token->', response.accessToken)
      }
      getTOken()
      setName(idTokenClaims?.name || idTokenClaims?.preferred_username)
    }
  }, [accounts, instance])
  return (
    <div>
      <Routes>
        <Route element={<AppLayout displayName={name || 'User Name'} />}>
          <Route path="/" element={<Dashboard displayName={name || 'User Name'} />} />
          <Route path={routePath.ISSUE_LISTING} element={<Report />} />
          <Route path="/issue-details/:id" element={<IssueDetailsPage />} />
          <Route path="/success-analyzer" element={<SuccessAnalyzer />} />
          <Route path="/license-analyzer" element={<LicenseAnalyzer />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
