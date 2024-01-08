import React from 'react'
import Drawer from '@mui/material/Drawer'
import { Box } from '@mui/material'

const DrawerComponent = ({ isOpen, onClose, content, anchor }) => {
  return (
    <Drawer anchor={anchor} open={isOpen} onClose={onClose}>
      <Box>{content}</Box>
    </Drawer>
  )
}

export default DrawerComponent
