import React, { useState } from 'react'
import {  IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import OffCanvasComponent from '../shared/common/OffCanvasComponent';

const HistoricReport = () => {
    const [showOffCanvas, setShowOffCanvas] = useState(false);

    const handleShowOffCanvas = () => setShowOffCanvas(true);
    const handleCloseOffCanvas = () => setShowOffCanvas(false);
  
  return (
<div className="p-3">
          <div className="fs-5 bold fw-bold">Customer Report History</div>
          <div className="customer-report d-flex flex-row justify-content-between">
              <div>hello</div>
              <div>
                  <IconButton onClick={handleShowOffCanvas} color="inherit">
                      <VisibilityIcon />
                  </IconButton>
              </div>
          </div>
     <OffCanvasComponent
          show={showOffCanvas}
          handleClose={handleCloseOffCanvas}
          title="My OffCanvas"
          triggerElement={handleShowOffCanvas}
          placement="end"
      >
              <p>This is the content of the modal.</p>
    </OffCanvasComponent>
          </div>
         
  )
}

export default HistoricReport