import React from 'react'
import { useSearchParams } from 'react-router-dom'
import CustomTabs from '../shared/common/CustomTabs'
import { STRING, detailsPageTab } from '../../constants/static'
import OngoingReport from './OngoingReport'
import HistoricReport from './HistoricReport'
import { Box, Typography } from '@mui/material'
import ImageElement from '../shared/common/ImageElement'
import { profile } from '../../assets/Images/images'

const IssueDetailsPage = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('active')

  return (
    <div className="container-fluid">
      <h3>Issues Details Page</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="custom-box p-3">
            <Box sx={{ display: 'flex', marginTop: 5, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ background: '#f2f2f2', borderRadius: '50%', overflow: 'hidden' }}>
                <ImageElement src={profile} placeholderSrc={profile} width={140} height={140} />
                {/* <Typography variant="h6" sx={{ padding: 7 }}>
                  Logo
                </Typography> */}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 20, marginTop: 4 }}>
                Kendrion (Villingen) Gmbh
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 16, marginTop: 4 }}>
              Contact Email
            </Typography>
            <Typography variant="h6" sx={{ fontSize: 14, marginTo: 0.5 }}>
              kendrion@ifs.com
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 16, marginTop: 3 }}>
              Contact number
            </Typography>
            <Typography variant="h6" sx={{ fontSize: 14, marginTo: 0.5 }}>
              kendrion@ifs.com
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 16, marginTop: 3 }}>
              Location
            </Typography>
            <Typography variant="h6" sx={{ fontSize: 14, marginTo: 0.5 }}>
              Kolkata, India
            </Typography>
          </div>
        </div>
        <div className="col-md-8">
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
