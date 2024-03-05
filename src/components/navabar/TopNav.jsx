import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { AppBar, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DrawerComponent from '../shared/common/DrawerComponent'
import UserProfile from '../account/UserProfile'
import ImageElement from '../shared/common/ImageElement'
import { logo } from '../../assets/Images/images'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

const TopNav = ({ name }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev)
  }
  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', textAlign: 'center' }}>
        <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} className="header-left">
              <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <IconButton onClick={() => navigate('/?active=create-report')}>
                <ImageElement src={logo} placeholderSrc={logo} height={35} />
              </IconButton>
              <Typography className='header-logo'>
                {/* {import.meta.env.VITE_APPLICATION_NAME} */}
                <img src="../src/assets/images/success-pilot-header-logo.svg" alt="Success pilot logo"></img>
              </Typography>
            </Box>
            <div className="header-right">
              <IconButton className="act-btn">
                <NotificationsOutlinedIcon />
              </IconButton>
              <IconButton className="act-btn">
                <SettingsOutlinedIcon />
              </IconButton>
              <UserProfile name={name} />
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <DrawerComponent anchor="left" isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} content={<SideBar onCloseDrawer={closeDrawer} />} />
    </>
  )
}

export default TopNav
