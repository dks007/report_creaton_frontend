import React, { useState } from 'react'
import { useMsal } from '@azure/msal-react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { AppBar, Toolbar, Typography } from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import { useNavigate } from 'react-router-dom'
import DrawerComponent from './shared/common/DrawerComponent'
import ImageElement from './shared/common/ImageElement'
import { logo } from '../assets/Images/images'

const NavigationBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { instance } = useMsal()

  const handleLogoutRedirect = () => {
    instance.logoutRedirect().catch((error) => console.log(error))
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', textAlign: 'center' }}>
        <AppBar position="static" color="inherit">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <IconButton onClick={() => navigate('/?active=create-report')}>
                <ImageElement src={logo} placeholderSrc={logo} height={35} />
              </IconButton>
              <Typography variant="h6" sx={{ marginLeft: 5, fontWeight: '800', fontSize: 18 }}>
                IFS Digital Assyst
              </Typography>
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
              </IconButton>
              <Typography variant="h6" component="h6">
                Sat Pal
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>Sat Pal</MenuItem>
        <MenuItem onClick={handleClose}>View profile</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Setting
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <QueryStatsIcon fontSize="small" />
          </ListItemIcon>
          Activity Log
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <StarOutlineIcon fontSize="small" />
          </ListItemIcon>
          Support
        </MenuItem>
        <MenuItem onClick={handleLogoutRedirect}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
      <DrawerComponent isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </React.Fragment>
  )
}

export default NavigationBar
