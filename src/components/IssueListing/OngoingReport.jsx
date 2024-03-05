import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import DownloadIcon from '@mui/icons-material/Download'
import RefreshIcon from '@mui/icons-material/Refresh'
import AddIcon from '@mui/icons-material/Add'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axiosInstance/axiosInstance'
import CreateReportModal from './CreateReportModal'

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#3D1B63',
    color: '#fff',
    maxWidth: 270,
    minWidth: 270
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  }
}))
const OngoingReport = ({issueData}) => {
  
  return (
    <div className="tab-container">
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} className="mb-4">
        <div className="report-title-container">
          <div className="report-title">Report Title</div>
          <h6>{issueData.issue_summary}</h6>
        </div>
      </Box>

      <div className="row value-listing">
        <div className="col-md-3">
          <h6>Jira ID</h6>
          <p>
          {issueData.issue_key}
            {/* tooltip for showing sub task */}
            {issueData.subtasks_list && issueData.subtasks_list.length > 0 && (
            <HtmlTooltip
              placement="right-start"
              arrow
              title={
                <React.Fragment>
                  <div className='tooltip-content-wrapper'>
                  {issueData.subtasks_list.map((subtask) => (
                    <div key={subtask.key} className="custom-tooltip-html contentonly">
                      <p>
                        <Typography color="inherit">Task ID</Typography>
                        {subtask.key}
                      </p>
                      <p className="value">
                        <Typography color="inherit">Title</Typography>
                        {subtask.summary}
                      </p>
                    </div>
                  ))}
                  </div>
                </React.Fragment>
              }
            >
              <img src="../src/assets/Images/sub-task.png" className="subtask-icon" alt="subtask" />
            </HtmlTooltip>
          )}
            {/* tooltip for showing sub task end*/}
          </p>
        </div>
        <div className="col-md-3">
          <h6>Customer Name</h6>
          <p>
          {issueData.customer_name}
           {/* tooltip for showing partner */}
           {issueData.partner === true && (
              <HtmlTooltip
                placement="right-start"
                arrow
                title={
                  <React.Fragment>
                    <div className="custom-tooltip-html">
                      <p>Partners</p>
                      <p className="value">This icon indicates that this report is created for a partner.</p>
                    </div>
                  </React.Fragment>
                }
              >
                <img src="../src/assets/Images/patner-icon.png" className="subtask-icon ml-10" alt="partner" />
              </HtmlTooltip>
            )}
            {/* tooltip for showing partner end*/}
          </p>
        </div>
        <div className="col-md-3">
          <h6>Menu Card Description</h6>
          <p>{issueData.menu_description}</p>
        </div>
        <div className="col-md-3">
          <h6>SDO</h6>
          <p>{issueData.sdo_name}</p>
        </div>
      </div>
      <div className="row value-listing">
        <div className="col-md-3">
          <h6>SDM</h6>
          <p>{issueData.sdm_name}</p>
        </div>
        <div className="col-md-3">
          <h6>CSM</h6>
          <p>{issueData.csm_name}</p>
        </div>
        <div className="col-md-3">
          <h6>Assigned Date</h6>
          <p>{issueData.assign_date}</p>
        </div>
        <div className="col-md-3">
          <h6>Created Date</h6>
          <p>{issueData.created_date}</p>
        </div>
      </div>
      <div className="row value-listing">
        <div className="col-md-3">
          <h6>Capability</h6>
          <p>{issueData.capability}</p>
        </div>
        <div className="col-md-3">
          <h6>Sub Capability</h6>
          <p>Supply Chain</p>
        </div>
        <div className="col-md-3">
          <h6>Reporter</h6>
          <p>{issueData.creator_name}</p>
        </div>
      </div>
      <div className="row value-listing">
        <div className="col-md-12">
          <h6>Ticket Description</h6>
          <p className="ticket-des">{issueData.description_content}</p>
          
        </div>
      </div>
    </div>
  )
}

export default OngoingReport
