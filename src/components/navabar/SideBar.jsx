import React from 'react'
import { Input, Box, Typography, Button } from '@mui/material'
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined'
import { useNavigate } from 'react-router-dom'
import { routePath } from '../../constants/routes'

const SideBar = () => {
  const navigate = useNavigate()

  const sidebarContainerStyle = {
    display: 'flex',
    flexDirection: 'column'
  }

  const searchInputStyle = {
    borderRadius: 15,
    marginBottom: 2,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    padding: '5px 0px 5px 20px',
    backgroundColor: '#fff',
    fontFamily: 'Inter, sans-serif'
  }

  const listItemStyle = {
    padding: 2,
    ':hover': {
      backgroundColor: '#e0e0e0',
      borderLeft: '2px solid #503998'
    }
  }

  const hexagonTextStyle = {
    display: 'flex',
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

  return (
    <Box sx={sidebarContainerStyle}>
      {/* <Input placeholder="Search....." disableUnderline fullWidth sx={searchInputStyle} /> */}
      <Box sx={listItemStyle}>
        <Box sx={hexagonTextStyle}>
          <HexagonOutlinedIcon />
          <Typography>Report</Typography>
        </Box>
        <Button variant="outlined" sx={buttonStyle} onClick={() => navigate(routePath.ISSUE_LISTING)}>
          <HexagonOutlinedIcon sx={{ marginRight: 2, color: 'black' }} />
          Create Report
        </Button>
      </Box>
      <Box sx={listItemStyle}>
        <Box sx={hexagonTextStyle}>
          <HexagonOutlinedIcon />
          <Typography>Usage Analyzer</Typography>
        </Box>
      </Box>
      <Box sx={listItemStyle}>
        <Box sx={hexagonTextStyle}>
          <HexagonOutlinedIcon />
          <Typography>Health Monitoring</Typography>
        </Box>
      </Box>
      <Box sx={listItemStyle}>
        <Box sx={hexagonTextStyle}>
          <HexagonOutlinedIcon />
          <Typography>Manage Team</Typography>
        </Box>
      </Box>
      <Box sx={listItemStyle}>
        <Box sx={hexagonTextStyle}>
          <HexagonOutlinedIcon />
          <Typography>Manage Customer</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default SideBar
