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
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
    whiteSpace: 'nowrap',
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
      <Box sx={listItemStyle} component="button" onClick={() => handleButtonClick(routePath.HOME)}>
        <Box sx={hexagonTextStyle}>
          <HexagonOutlinedIcon />
          <Typography>Home Page</Typography>
        </Box>
      </Box>
      <Box sx={listItemStyle} component="button">
        <Box sx={hexagonTextStyle}>
          <HexagonOutlinedIcon />
          <Typography>Report</Typography>
        </Box>
        <Button variant="outlined" sx={buttonStyle} onClick={() => handleButtonClick(routePath.CREATE_REPORT)}>
          <HexagonOutlinedIcon sx={{ marginRight: 1, color: 'black' }} />
          Create Report
        </Button>
        <Button variant="outlined" sx={buttonStyle} onClick={() => handleButtonClick(routePath.STATISTICS)}>
          <HexagonOutlinedIcon sx={{ marginRight: 1, color: 'black' }} />
          statistics
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
