import React from 'react'
import { Box, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { routePath } from '../../constants/routes'

import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined'
import AssignmentIcon from '@mui/icons-material/Assignment'
import BarChartIcon from '@mui/icons-material/BarChart'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'

const menuItems = [
  { icon: <SpaceDashboardIcon />, label: 'Dashboard', path: routePath.HOME },
  { icon: <AssignmentIcon />, label: 'Report', path: routePath.ISSUE_LISTING },
  { icon: <BarChartIcon />, label: 'Success Analyzer', path: '/success-analyzer' },
  // { icon: <ReceiptLongIcon />, label: 'Health Monitoring', path: '/health-monitoring' },
  // { icon: <SupervisedUserCircleIcon />, label: 'Manage Team', path: '/manage-team' },
  // { icon: <RecentActorsIcon />, label: 'Manage Customer', path: '/manage-customer' }
]

const SideBar = ({ onCloseDrawer }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleButtonClick = (path) => {
    navigate(path)
    onCloseDrawer()
  }

  return (
    <Box className="navigation-menu">
      {menuItems.map((menuItem, index) => (
        <Box
          key={index}
          component="button"
          className={`menu-item ${location.pathname === menuItem.path ? 'active' : ''}`}
          onClick={() => handleButtonClick(menuItem.path)}
        >
          <Box>
            {menuItem.icon}
            <Typography>{menuItem.label}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default SideBar
