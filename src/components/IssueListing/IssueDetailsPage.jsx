import React from 'react'
import { useSearchParams } from 'react-router-dom'
import CustomTabs from '../shared/common/CustomTabs'
import { STRING, assignedJiraIssuesDetails, detailsPageTab } from '../../constants/static'
import OngoingReport from './OngoingReport'
import HistoricReport from './HistoricReport'
import { Box, Typography } from '@mui/material'
import ImageElement from '../shared/common/ImageElement'
import { profile } from '../../assets/Images/images'
import IconBreadcrumbs from '../shared/common/IconBreadcrumbs'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const IssueDetailsPage = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('active')

  return (
    <div className="details-page">
      <h3>Issues Details Page</h3>
      <IconBreadcrumbs breadcrumbs={assignedJiraIssuesDetails} />
      <div className="row" style={{ marginTop: '20px' }}>
        <div className="col-md-3 customer-info">
          <div className="custom-box">
            <Box className='customer-details'>
              <Box className='customer-logo'>
                <ImageElement src={profile} placeholderSrc={profile} width={140} height={140} />
                {/* <Typography variant="h6" sx={{ padding: 7 }}>
                  Logo
                </Typography> */}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 20, marginTop: 1 }}>
                Kendrion (Villingen) Gmbh
              </Typography>
            </Box>
            <div className='detail-list'>
              <h6>Customer ID</h6>
              <p><span>kendrion@ifs.com</span><ContentCopyIcon /></p>
            </div>
            <div className='detail-list'>
              <h6>Project ID</h6>
              <p><span>APX100006</span><ContentCopyIcon /></p>
            </div>
            <div className='detail-list'>
              <h6>Contact Email</h6>
              <p><span>kendrion@ifs.com</span><ContentCopyIcon /></p>
            </div>
            <div className='detail-list'>
              <h6>Contact number</h6>
              <p><span>+1-562-856-8956</span><ContentCopyIcon /></p>
            </div>
            <div className='detail-list'>
              <h6>Location</h6>
              <p><span>Kolkata, India</span><ContentCopyIcon /></p>
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
