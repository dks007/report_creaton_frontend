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
      <div className="fs-5 bold fw-bold">Customer Report History</div>
      <div className="customer-report d-flex flex-row justify-content-between">
        <div>hello</div>
        <div>
          <IconButton onClick={toggleDrawer} color="inherit">
            <VisibilityIcon />
          </IconButton>
        </div>
      </div>

      <DrawerComponent anchor="right" isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} content={<div>Hello</div>} />
    </div>
  )
}

export default HistoricReport
