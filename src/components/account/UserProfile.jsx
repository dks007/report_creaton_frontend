import { Box, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useMsal } from '@azure/msal-react'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
// import Divider from '@mui/material/Divider'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { Typography } from '@mui/material'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import ArticleIcon from '@mui/icons-material/Article'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import { toTitleCase } from '../../utils/helperFunction'

const UserProfile = ({ name }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

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
    <div>
      <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="user-profile">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
        </IconButton>
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
        {/* user profile name and view profile */}
        <Box className="user-name">
          <Typography>{toTitleCase(name)}</Typography>
          <MenuItem onClick={handleClose}>View profile</MenuItem>
        </Box>

        {/* <Divider /> */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Setting
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ArticleIcon fontSize="small" />
          </ListItemIcon>
          Activity Log
        </MenuItem>
        <MenuItem>
          <a href="mailto:support.successpilot@ifs.com">
          <ListItemIcon>
            <ContactSupportIcon fontSize="small" />
          </ListItemIcon>
          Support
          </a>
        </MenuItem>
        <MenuItem onClick={handleLogoutRedirect}>
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </div>
  )
}

export default UserProfile
