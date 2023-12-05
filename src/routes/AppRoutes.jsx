import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import NavigationBar from '../components/NavigationBar'
import Home from '../pages/home/Home'
import { routePath } from '../constants/routes'
import IssueDetailsPage from '../components/IssueListing/IssueDetailsPage'

const AppRoutes = () => {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={routePath.HOME} element={<Home />} />
          <Route path="/issue/:id" element={<IssueDetailsPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
