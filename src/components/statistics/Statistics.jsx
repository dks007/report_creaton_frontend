import React from 'react'
import Seo from '../shared/common/Seo'
import Box from '@mui/material/Box'

const Statistics = () => {
  return (
    <div>
      <Seo title="Statistics" />
      <h3>Statistics</h3>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: '100%' }}>{/* <Chart {...chartData} /> */}</Box>
        <Box sx={{ width: '100%' }}>{/* <Chart {...chartData} /> */}</Box>
      </Box>
    </div>
  )
}

export default Statistics
