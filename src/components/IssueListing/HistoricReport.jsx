import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DrawerComponent from '../shared/common/DrawerComponent'

const HistoricReport = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev)
  }
  return (
    <div className="p-3">
      <div className="fs-5">Older Report Created</div>
      <div className="d-flex flex-row  justify-content-between">
        <div>5 Reports recorded</div>
        
        <div>
          <IconButton onClick={toggleDrawer} color="inherit">
            <VisibilityIcon />
          </IconButton>
        </div>
      </div>

      <DrawerComponent anchor="right" isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} content={<div>Historical Report</div>} />
    </div>
  )
}

export default HistoricReport
