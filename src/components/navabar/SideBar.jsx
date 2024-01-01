import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined'
import { Link, useNavigate } from 'react-router-dom'
import { routePath } from '../../constants/routes'

const SideBar = ({ onCloseDrawer }) => {
  const navigate = useNavigate()

  const sidebarContainerStyle = {
    display: 'flex',
    flexDirection: 'column'
  }

  const listItemStyle = {
    padding: 2,
    border: 'none',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: '#e0e0e0',
      borderLeft: '2px solid #503998'
    }
  }

  const hexagonTextStyle = {
    display: 'flex',
    border: 'none',
    backgroundColor: 'transparent',
    gap: 1.5
  }

  const buttonStyle = {
    marginTop: 2,
    marginLeft: 3,
    textTransform: 'none',
    border: '1px solid black',
    color: 'black',
    width: '80%',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#f3f3f3',
      border: '1px solid black'
    }
  }

  const handleButtonClick = (path) => {
    navigate(path)
    onCloseDrawer()
  }

  return (
    <Box sx={sidebarContainerStyle}>
      <Box sx={listItemStyle} component="button">
        <Box sx={hexagonTextStyle}>
          <HexagonOutlinedIcon />
          <Typography>Report</Typography>
        </Box>
        <Button variant="outlined" sx={buttonStyle} onClick={() => handleButtonClick(routePath.ISSUE_LISTING)}>
          <HexagonOutlinedIcon sx={{ marginRight: 1, color: 'black' }} />
          Create Report
        </Button>
      </Box>
      <Box sx={listItemStyle} component="button">
        <Box sx={hexagonTextStyle}>
          <HexagonOutlinedIcon />
          <Typography>Usage Analyzer</Typography>
        </Box>
      </Box>
      <Box sx={listItemStyle} component="button">
        <Box sx={hexagonTextStyle}>
          <HexagonOutlinedIcon />
          <Typography>Health Monitoring</Typography>
        </Box>
      </Box>
      <Box sx={listItemStyle} component="button">
        <Box sx={hexagonTextStyle}>
          <HexagonOutlinedIcon />
          <Typography>Manage Team</Typography>
        </Box>
      </Box>
      <Box sx={listItemStyle} component="button">
        <Box sx={hexagonTextStyle}>
          <HexagonOutlinedIcon />
          <Typography>Manage Customer</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default SideBar
