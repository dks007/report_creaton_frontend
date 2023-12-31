import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routePath } from '../constants/routes'
import IssueDetailsPage from '../components/IssueListing/IssueDetailsPage'
import Auth from '../pages/auth/Auth'
import PageNotFound from '../pages/404/PageNotFound'
import Dashboard from '../pages/dashboard/Dashboard'
import AppLayout from '../layout/AppLayout'
import Report from '../pages/report/Report'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<AppLayout />}>
          <Route path={routePath.ISSUE_LISTING} element={<Report />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/issue-details/:id" element={<IssueDetailsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
