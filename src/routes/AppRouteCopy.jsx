import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routePath } from '../constants/routes'
import IssueDetailsPage from '../components/IssueListing/IssueDetailsPage'
import PageNotFound from '../pages/404/PageNotFound'
import Dashboard from '../pages/dashboard/Dashboard'
import AppLayout from '../layout/AppLayout'
import Report from '../pages/report/Report'
import AuthCopy from '../pages/auth/AuthCopy'

const AppRoutesCopy = () => {
  const name = 'user name'
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthCopy />} />
        <Route element={<AppLayout displayName={name} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path={routePath.ISSUE_LISTING} element={<Report />} />
          <Route path="/issue-details/:id" element={<IssueDetailsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutesCopy
