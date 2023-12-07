import { Box, Typography } from '@mui/material'
import React from 'react'
const OngoingReport = () => {
  return (
    <div className="p-3">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="report-title">Report Title</div>
        <div className="report-In-progress">In-progress</div>
      </Box>
      <Typography variant="h6" sx={{ fontSize: 22, fontWeight: 'bold' }}>
        SAA2 - Kendrion (Villingen) Gmbh
      </Typography>
      <div className="row">
        <div className="col-md-3">
          <h6>Jira ID</h6>
          <p>JI145455</p>
        </div>
        <div className="col-md-3">
          <h6>Customer Name</h6>
          <p>Kendrion (Villingen) Gmbh</p>
        </div>
        <div className="col-md-3">
          <h6>Menu Card Description</h6>
          <p>Solution design for IFS Software</p>
        </div>
        <div className="col-md-3">
          <h6>SDO</h6>
          <p>Srilal Abeykoon</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <h6>SDM</h6>
          <p>Morgan Freeman</p>
        </div>
        <div className="col-md-3">
          <h6>CSM</h6>
          <p>Morgan Freeman</p>
        </div>
        <div className="col-md-3">
          <h6>Assigned Date</h6>
          <p>5 Aug 2023</p>
        </div>
        <div className="col-md-3">
          <h6>Created Date</h6>
          <p>5 Aug 2023</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <h6>Capability</h6>
          <p>Finance</p>
        </div>
        <div className="col-md-3">
          <h6>Sub Capability</h6>
          <p>Supply Chain</p>
        </div>
        <div className="col-md-3">
          <h6>Reporter</h6>
          <p>Irshad Iqbal</p>
        </div>
      </div>
      <h6 className="mt-5">Ticket Description</h6>
      <p className="ticket-des">Primary industry : Finance</p>
      <p className="ticket-des">Product: IFS Cloud</p>
      <p className="ticket-des">Current Software version : 22.2.8</p>
      <p className="ticket-des">Frequency: 1</p>
      <p className="ticket-des">Prerequest Information: Need advice with posting</p>
      <p className="ticket-des">types: TMP and TP3</p>
    </div>
  )
}

export default OngoingReport
