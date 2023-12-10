import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { routePath } from '../../constants/routes'
import CustomModal from '../shared/common/CustomModal'
import { Box, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CreateReportContent from './createReport/CreateReportContent'

const IssueBody = ({ issue, index }) => {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleHideModal = () => setShowModal(false)

  return (
    <>
      <tr className="table">
        <th scope="row">{index + 1}</th>
        <td className="jira-col">
          <Link to={`${routePath.ISSUEBYID}${issue.jira_id}`}>{issue.jira_id}</Link>
        </td>
        <td className="customer-col">{issue.customer_name}</td>
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
        </td>
      </tr>
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
    </>
  )
}

export default IssueBody
