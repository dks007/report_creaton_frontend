import React from 'react'
import Drawer from '@mui/material/Drawer'
import { Box } from '@mui/material'

const DrawerComponent = ({ isOpen, onClose, content, anchor }) => {
  return (
    <Drawer anchor={anchor} open={isOpen} onClose={onClose}>
      <Box sx={{ marginTop: 8, padding: 1 }}>{content}</Box>
    </Drawer>
  )
}

export default DrawerComponent
