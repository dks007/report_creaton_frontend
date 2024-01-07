import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from '../components/navabar/TopNav'

const AppLayout = ({ displayName }) => {
  return (
    <div>
      <TopNav displayName={displayName} />
      <div className="container-fluid">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
