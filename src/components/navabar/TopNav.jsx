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

const TopNav = () => {
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <IconButton onClick={() => navigate('/?active=create-report')}>
                <ImageElement src={logo} placeholderSrc={logo} height={35} />
              </IconButton>
              <Typography variant="h6" sx={{ marginLeft: 5, fontWeight: '800', fontSize: 18 }}>
                {import.meta.env.VITE_APPLICATION_NAME}
              </Typography>
            </Box>
            <UserProfile />
          </Toolbar>
        </AppBar>
      </Box>

      <DrawerComponent anchor="left" isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} content={<SideBar onCloseDrawer={closeDrawer} />} />
    </>
  )
}

export default TopNav
