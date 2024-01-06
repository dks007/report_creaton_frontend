import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { routePath } from '../../constants/routes'
import CustomModal from '../shared/common/CustomModal'
import { Box, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CreateReportContent from './createReport/CreateReportContent'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import InfoIcon from '@mui/icons-material/Info'
import DownloadIcon from '@mui/icons-material/Download'
import RefreshIcon from '@mui/icons-material/Refresh'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

const IssueBody = ({ issue, index }) => {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleHideModal = () => setShowModal(false)

  // ** Start: Action button/column */

  const renderActionColumn = () => {
    switch (issue.proect_status) {
      case '0': // Not Created
        return (
          <div className="button-wrapper">
            <button className="btn report-status not-created" onClick={handleShowModal}>
              + Create Report
            </button>
            <CustomModal open={showModal}>
              <Box
                sx={{
                  display: 'flex',
                  padding: 0.5,
                  paddingLeft: 2,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#503998'
                }}
              >
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                  Creating document for
                </Typography>
                <IconButton onClick={handleHideModal}>
                  <CloseIcon sx={{ color: 'white' }} />
                </IconButton>
              </Box>
              <Box sx={{ padding: 2 }}>
                <CreateReportContent issue={issue} onClose={handleHideModal} />
              </Box>
            </CustomModal>
          </div>
        )

      case '1': // Creating Report
        return (
          <div className="button-wrapper">
            <button className="btn report-status in-process">
              <img src="../src/assets/images/loader-sml.svg" />
            </button>
          </div>
        )

      case '2': // Created
        return (
          <div className="button-wrapper">
            <IconButton onClick={handleDownload} className="act-btn download-btn">
              <DownloadIcon />
            </IconButton>
            <IconButton onClick={handleRefresh} className="act-btn refresh-btn">
              <RefreshIcon />
            </IconButton>
          </div>
        )

      case '3': // Creation Error
        return (
          <div className="button-wrapper">
            <IconButton onClick={handleError} className="act-btn error-btn">
              <ReportProblemIcon />
            </IconButton>
            <IconButton onClick={handleRefresh} className="act-btn refresh-btn">
              <RefreshIcon />
            </IconButton>
          </div>
        )

      default:
        return null
    }
  }

  const handleDownload = () => {
    // Handle download action
  }

  const handleRefresh = () => {
    // Handle refresh action
  }

  const handleError = () => {
    // Handle error action
  }

  // ** End: Action button/column */

  // Function to get the report status text based on proect_status value
  const getReportStatusText = (proectStatus) => {
    switch (proectStatus) {
      case '0':
        return 'Not Created'
      case '1':
        return 'Creating Report'
      case '2':
        return 'Created '
      case '3':
        return 'Creation Error'
      default:
        return 'Unknown Status'
    }
  }

  const reportStatusText = getReportStatusText(issue.proect_status)

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

  return (
    <>
      <tr className="table">
        <th scope="row">{index + 1}</th>
        <td className="jira-col">
          <Link to={`${routePath.ISSUEBYID}${issue.jira_id}`}>{issue.jira_id}</Link>
          {/* tooltip for showing sub task */}
          {issue.subtasks_list && issue.subtasks_list.length > 0 && (
            <HtmlTooltip
              placement="right-start"
              arrow
              title={
                <React.Fragment>
                  {issue.subtasks_list.map((subtask) => (
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
                </React.Fragment>
              }
            >
              <img src="../src/assets/Images/sub-task.png" className="subtask-icon" alt="subtask" />
            </HtmlTooltip>
          )}
          {/* tooltip for showing sub task end*/}
        </td>
        <td className="customer-col fw-medium">
          <div className="customer-information">
            <span>{issue.customer_name}</span>
            <HtmlTooltip
              placement="right-start"
              arrow
              title={
                <React.Fragment>
                  <div className="custom-tooltip-html">
                    <p>Customer ID</p>
                    <p className="value">{issue.customer_id}</p>
                  </div>
                  <div className="custom-tooltip-html">
                    <p>Project ID</p>
                    <p className="value">{issue.project_id}</p>
                  </div>
                </React.Fragment>
              }
            >
              <InfoIcon fontSize="extra-small" className="ml-10 main-color-fill" />
            </HtmlTooltip>
            {/* tooltip for showing sub task */}
            {issue.partner === '1' && (
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
            {/* tooltip for showing sub task end*/}
          </div>
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
          <span className={`report-status status-${issue.proect_status}`}>{reportStatusText}</span>
        </td>
        <td className="action-col">{renderActionColumn()}</td>
      </tr>
    </>
  )
}

export default IssueBody
