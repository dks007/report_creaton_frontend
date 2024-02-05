import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { routePath } from '../../constants/routes'
import { Typography } from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import InfoIcon from '@mui/icons-material/Info'
import DownloadIcon from '@mui/icons-material/Download'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add'
import CreateReportModal from './CreateReportModal'
import SyncTwoToneIcon from '@mui/icons-material/SyncTwoTone'

const IssueBody = ({ issue, index, BasicMenu }) => {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal(true)
    handleClose()
  }
  const handleHideModal = () => setShowModal(false)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // ** Start: Action button/column */

  const handleDownload = () => {
    // Handle download action
  }

  const handleRefresh = () => {
    // Handle refresh action
  }
  // ** End: Action button/column */
  const renderActionButton = () => {
    switch (issue.report_status) {
      case '0': // Not Created
        return (
          <MenuItem onClick={handleShowModal}>
            <AddIcon /> Create Report
          </MenuItem>
        )

      case '1': // Creating Report
        return (
          <MenuItem onClick={handleDownload}>
            <DownloadIcon /> Another action
          </MenuItem>
        )

      case '2': // Created
        return (
          <MenuItem onClick={handleDownload}>
            <DownloadIcon /> Another action
          </MenuItem>
        )

      case '3': // Creation Error
        return (
          <MenuItem onClick={handleRefresh}>
            <SyncTwoToneIcon /> Refresh
          </MenuItem>
        )
      case '4': // Creation Error
        return (
          <MenuItem onClick={handleRefresh}>
            <SyncTwoToneIcon />
            Unknown
          </MenuItem>
        )

      default:
        return null
    }
  }
  // Function to get the report status text based on report_status value
  const getReportStatusText = () => {
    switch (issue.report_status) {
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
  const getRowColor = () => {
    switch (issue.report_status) {
      case '0':
        return ''
      case '1':
        return 'orange-row'
      case '2':
        return 'green-row'
      case '3':
        return 'red-row'
      default:
        return ''
    }
  }
  const dynamicClass = getRowColor()

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
      <tr className={`table ${dynamicClass}`}>
        <th scope="row">
          <div className="item-number-action">
            {index + 1}
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
              className="list-item-action"
            >
              {renderActionButton()}
            </Menu>
            <CreateReportModal showModal={showModal} handleHideModal={handleHideModal} issue={issue} />
          </div>
        </th>
        <td className="jira-col">
          <Link to={`${routePath.ISSUEBYID}${issue.issue_key}`}>{issue.issue_key}</Link>
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
            <span>{issue.project_name}</span>
            <HtmlTooltip
              placement="right-start"
              arrow
              title={
                <React.Fragment>
                  <div className="custom-tooltip-html">
                    <p>Customer Name</p>
                    <p className="value">{issue.project_name}</p>
                  </div>
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
            {issue.partner === true && (
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
        <td className="menu-id-col">
          <div>
            <span>{issue.menu_card}</span>
            <HtmlTooltip
              placement="right-start"
              arrow
              title={
                <React.Fragment>
                  <div className="custom-tooltip-html">
                    <p className="reguler-text font-14">Solution design for IFS software Application</p>
                  </div>
                </React.Fragment>
              }
            >
              <InfoIcon fontSize="extra-small" className="ml-10 main-color-fill" />
            </HtmlTooltip>
          </div>
        </td>
        {/* <td className="menu-des-col"><Tooltip title="{issue.menu_desc}" placement="bottom"><div>{issue.menu_desc}</div></Tooltip></td> */}
        <td className="ticket-des-col" width="250">
          <div>{issue.issue_summary}</div>
        </td>
        <td className="csm-col">
          <div>{issue.csm_name}</div>
        </td>
        <td className="sdm-col">
          <div>{issue.sdm_name}</div>
        </td>
        <td className="sdo-col">
          <div>{issue.sdo_name}</div>
        </td>
        <td className="created-col">
          <div>{issue.created_date}</div>
        </td>
        <td className="assigned-col">
          <div>{issue.assign_date}</div>
        </td>
        <td className="report-col">
          <div>
            <span className={`report-status status-${issue.report_status}`}>
              {issue.report_status === '3' && (
                <HtmlTooltip
                  placement="right-start"
                  arrow
                  title={
                    <React.Fragment>
                      <div className="custom-tooltip-html">
                        <p className="reguler-text font-14">
                          We came across an error when creating this report. <br />
                          Error: "Customer email is not a valid email address"
                        </p>
                      </div>
                    </React.Fragment>
                  }
                  className="error-tooltip"
                >
                  <InfoIcon fontSize="extra-small" className="ml-10 main-color-fill" />
                </HtmlTooltip>
              )}
              {getReportStatusText()}
            </span>
          </div>
        </td>
      </tr>
    </>
  )
}

export default IssueBody
