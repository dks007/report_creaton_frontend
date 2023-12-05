import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material'

const DrawerComponent = ({ isOpen, onClose, items }) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      {/* <List>
        {items.map((item, index) => (
          <ListItem key={index} button component={Link} to={item.link}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List> */}
      <Box sx={{ width: '350px' }}>
        <Box>Report</Box>
        <Box>Report</Box>
      </Box>
    </Drawer>
  )
}

export default DrawerComponent
