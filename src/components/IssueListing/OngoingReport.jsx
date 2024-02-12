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
const OngoingReport = () => {
  const [loading, setLoading] = useState(false)
  const [issueData, setIssueData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get(`/issue-details/${id}`)
        setIssueData(response.data)
        console.log(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    // fetchData()
  }, [])

  return (
    <div className="tab-container">
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} className="mb-4">
        <div className="report-title-container">
          <div className="report-title">Report Title</div>
          <h6>SAA2 - Kendrion (Villingen) Gmbh</h6>
        </div>
      </Box>

      <div className="row value-listing">
        <div className="col-md-3">
          <h6>Jira ID</h6>
          <p>
            JI145455
            {/* tooltip for showing sub task */}
            <HtmlTooltip
              placement="right-start"
              arrow
              title={
                <React.Fragment>
                  <div className="custom-tooltip-html contentonly">
                    <p>
                      <Typography color="inherit">Task ID: CH21354</Typography>
                    </p>
                    <p className="value">
                      <Typography color="inherit">Title</Typography>
                      This is the syb task
                    </p>
                  </div>
                </React.Fragment>
              }
            >
              <img src="../src/assets/Images/sub-task.png" className="subtask-icon" alt="subtask" />
            </HtmlTooltip>
            {/* tooltip for showing sub task end*/}
          </p>
        </div>
        <div className="col-md-3">
          <h6>Customer Name</h6>
          <p>
            Kendrion (Villingen) Gmbh
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
          </p>
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
      <div className="row value-listing">
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
      <div className="row value-listing">
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
      <div className="row value-listing">
        <div className="col-md-12">
          <h6>Ticket Description</h6>
          <p className="ticket-des">Primary industry : Finance</p>
          <p className="ticket-des">Product: IFS Cloud</p>
          <p className="ticket-des">Current Software version : 22.2.8</p>
          <p className="ticket-des">Frequency: 1</p>
          <p className="ticket-des">Prerequest Information: Need advice with posting</p>
          <p className="ticket-des">types: TMP and TP3</p>
        </div>
      </div>
    </div>
  )
}

export default OngoingReport
