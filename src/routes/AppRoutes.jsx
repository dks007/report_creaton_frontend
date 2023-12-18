import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import { routePath } from '../constants/routes'
import IssueDetailsPage from '../components/IssueListing/IssueDetailsPage'
import TopNav from '../components/navabar/TopNav'
import Auth from '../pages/auth/Auth'

const AppRoutes = () => {
  return (
    <div>
      <TopNav />
      <Routes>
        <Route path={routePath.ISSUE_LISTING} element={<Home />} />
        <Route path="/" element={<Auth />} />
        <Route path="/issue-details/:id" element={<IssueDetailsPage />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
