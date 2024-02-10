import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import CustomTabs from '../shared/common/CustomTabs'
import { STRING, assignedJiraIssuesDetails, detailsPageTab } from '../../constants/static'
import OngoingReport from './OngoingReport'
import HistoricReport from './HistoricReport'
import { Box, Typography } from '@mui/material'
import ImageElement from '../shared/common/ImageElement'
import { profile } from '../../assets/Images/images'
import IconBreadcrumbs from '../shared/common/IconBreadcrumbs'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'
import SyncTwoToneIcon from '@mui/icons-material/SyncTwoTone'
import CreateReportModal from './CreateReportModal'
import Loader from '../shared/common/Loader'
import axiosInstance from '../../axiosInstance/axiosInstance '

const IssueDetailsPage = () => {
  const [searchParams] = useSearchParams()
  const { id } = useParams()
  const tab = searchParams.get('active')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [issueData, setIssueData] = useState([])
  const [error, setError] = useState(null)

  const handleShowModal = () => {
    setShowModal(true)
  }
  const handleHideModal = () => setShowModal(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get('/c424524f-c112-4024-b04e-c9dfed98c275')
        setIssueData(response.data.resdata)
        // const response = await axiosInstance.get('/api/issue-listing/')
        // setIssueData(response.data.resdata)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('An error occurred while fetching data. Please try again later.')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const issue = []

  const renderActionButton = () => {
    switch (issueData.report_status) {
      case '0': // Not Created
        return (
          <button onClick={handleShowModal} className="btn primery-btn">
            <AddIcon /> Create Report
          </button>
        )

      case '1': // Creating Report
        return <div className="report-status status-0 ms-2">In-progress</div>

      case '2': // Created
        return (
          <button onClick={() => {}} className="btn primery-btn sml-btn">
            <DownloadIcon />
          </button>
        )

      case '3': // Creation Error
        return (
          <button className="btn blue-btn sml-btn" onClick={handleShowModal}>
            <SyncTwoToneIcon />
          </button>
        )

      default:
        return (
          <button onClick={handleShowModal} className="btn primery-btn">
            <AddIcon /> Create Report
          </button>
        )
    }
  }
  return (
    <div className="details-page">
      {loading && <Loader />}
      <Box className="row">
        <Box className="col-md-8">
          <h3>Issues Details Page</h3>
          <IconBreadcrumbs breadcrumbs={assignedJiraIssuesDetails} />
        </Box>
        <Box className="col-md-4 action-items">{renderActionButton()}</Box>
        <CreateReportModal showModal={showModal} handleHideModal={handleHideModal} issue={issue} />
      </Box>
      <div className="row" style={{ marginTop: '20px' }}>
        <div className="col-md-3 customer-info">
          <div className="custom-box">
            <Box className="customer-details">
              <Box className="customer-logo">
                <ImageElement src={profile} placeholderSrc={profile} width={140} height={140} />
                {/* <Typography variant="h6" sx={{ padding: 7 }}>
                  Logo
                </Typography> */}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 20, marginTop: 1 }}>
                Kendrion (Villingen) Gmbh
              </Typography>
            </Box>
            <div className="detail-list">
              <h6>Customer ID</h6>
              <p>
                <span>kendrion@ifs.com</span>
                <ContentCopyIcon />
              </p>
            </div>
            <div className="detail-list">
              <h6>Project ID</h6>
              <p>
                <span>APX100006</span>
                <ContentCopyIcon />
              </p>
            </div>
            <div className="detail-list">
              <h6>Contact Email</h6>
              <p>
                <span>kendrion@ifs.com</span>
                <ContentCopyIcon />
              </p>
            </div>
            <div className="detail-list">
              <h6>Contact number</h6>
              <p>
                <span>+1-562-856-8956</span>
                <ContentCopyIcon />
              </p>
            </div>
            <div className="detail-list">
              <h6>Location</h6>
              <p>
                <span>Kolkata, India</span>
                <ContentCopyIcon />
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="custom-box">
            <CustomTabs tabs={detailsPageTab} defaultTab={STRING.ONGOING_REPORT} tabName={STRING.ACTIVE} />

            {tab === 'ongoing-report' && <OngoingReport />}
            {tab === 'historical-report' && <HistoricReport />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssueDetailsPage
