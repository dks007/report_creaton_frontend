import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined'
import { Link, useNavigate } from 'react-router-dom'
import { routePath } from '../../constants/routes'
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';

const SideBar = ({ onCloseDrawer }) => {
  const navigate = useNavigate()




  const handleButtonClick = (path) => {
    navigate(path)
    onCloseDrawer()
  }

  return (
    <Box className='navigation-menu'>
      <Box component="button" className='menu-item'>
        <Box>
          <SpaceDashboardIcon/>
          <Typography>Dashboard</Typography>
        </Box>
      </Box>
      <Box component="button" className='menu-item active'>
        <Box onClick={() => handleButtonClick(routePath.ISSUE_LISTING)}>
          <AssignmentIcon />
          <Typography>Report</Typography>
        </Box>
      </Box>
      <Box component="button" className='menu-item'>
        <Box>
          <BarChartIcon />
          <Typography>Usage Analyzer</Typography>
        </Box>
      </Box>
      <Box component="button" className='menu-item'>
        <Box>
          <ReceiptLongIcon />
          <Typography>Health Monitoring</Typography>
        </Box>
      </Box>
      <Box component="button" className='menu-item'>
        <Box>
          <SupervisedUserCircleIcon />
          <Typography>Manage Team</Typography>
        </Box>
      </Box>
      <Box component="button" className='menu-item'>
        <Box>
          <RecentActorsIcon />
          <Typography>Manage Customer</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default SideBar
