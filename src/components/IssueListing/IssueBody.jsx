import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { routePath } from '../../constants/routes'
import CustomModal from '../shared/common/CustomModal'
import { Box, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CreateReportContent from './createReport/CreateReportContent'
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';


const IssueBody = ({ issue, index }) => {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleHideModal = () => setShowModal(false)
 
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#3D1B63',
      color: '#fff',
      maxWidth: 270,
      minWidth: 270,
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
  }));

  return (
    <>
      <tr className="table">
        <th scope="row">{index + 1}</th>
        <td className="jira-col">
          <Link to={`${routePath.ISSUEBYID}${issue.jira_id}`}>{issue.jira_id}</Link>
          {/* tooltip for showing sub task */}
          <HtmlTooltip placement="right-start" arrow title={
              <React.Fragment>
                <Typography color="inherit">Sub Task ID: FI2355125</Typography>
                <div className='custom-tooltip-html contentonly'>
                  <p>Title</p>
                  <p className='value'>Create report for CME1</p>
                </div>
                <div className='custom-tooltip-html contentonly'>
                  <p>Description</p>
                  <p className='value'>This icon indicates that this is a sub-task assigned to you.</p>
                </div>
              </React.Fragment>
            }>
            <img src='../src/assets/Images/sub-task.png' className='subtask-icon'/>
          </HtmlTooltip>
          {/* tooltip for showing sub task end*/}
        </td>
        <td className="customer-col fw-medium">
          {issue.customer_name}
          <HtmlTooltip placement="right-start" arrow title={
            <React.Fragment>
              {/* <Typography color="inherit">Customer Info</Typography> */}
              <div className='custom-tooltip-html'>
                <p>Customer ID</p>
                <p className='value'>1200006</p>
              </div>
              <div className='custom-tooltip-html'>
                <p>Project ID</p>
                <p className='value'>APX100006</p>
              </div>
            </React.Fragment>
            }>
            <InfoIcon fontSize='extra-small main-color-fill' className='ml-10'/>
          </HtmlTooltip>
          {/* tooltip for showing sub task */}
            <HtmlTooltip placement="right-start" arrow title={
              <React.Fragment>
                <div className='custom-tooltip-html contentonly'>
                  <p>Partners</p>
                  <p className='value'>This icon indicates that this report is created for a partner.</p>
                </div>
              </React.Fragment>
            }>
            <img src='../src/assets/Images/patner-icon.png' className='subtask-icon ml-10'/>
          </HtmlTooltip>
          {/* tooltip for showing sub task end*/}
          </td>
        <td className="menu-id-col">{issue.menu_id}</td>
        <td className="menu-des-col">{issue.menu_desc}</td>
        <td className="ticket-des-col">{issue.ticket_desc}</td>
        <td className="sdo-col">{issue.sdo}</td>
        <td className="sdm-col">{issue.sdm}</td>
        <td className="csm-col">{issue.csm}</td>
        <td className="assigned-col">{issue.assign_date}</td>
        <td className="created-col">{issue.created_date}</td>
        <td className="report-col">
          <span className="report-status not-created">Not Created</span>
        </td>
        <td className="action-col">
          <button className="btn report-status not-created" onClick={handleShowModal}>
            + Create Report
          </button>
          <CustomModal open={showModal}>
            <Box sx={{ display: 'flex', padding: 0.5, paddingLeft: 2, justifyContent: 'space-between', alignItems: 'center', background: '#503998' }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                Creating document for
              </Typography>
              <IconButton onClick={handleHideModal}>
                <CloseIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>
            <Box sx={{ padding: 2 }}>
              <CreateReportContent issue={issue} />
            </Box>
          </CustomModal>
        </td>
      </tr>
    </>
  )
}

export default IssueBody
