import React from 'react'
import { Container, Typography, Grid, Card, CardContent, IconButton, LinearProgress, Paper } from '@mui/material'

import IconBreadcrumbs from '../../components/shared/common/IconBreadcrumbs'
import { homeScreen } from '../../constants/static'

const Dashboard = () => {
  return (
    <div>
      <h3>Welcome to Success Tool Reporting</h3>
      <IconBreadcrumbs breadcrumbs={homeScreen} />

      <Grid container spacing={3} className="mt-4">
        {/* Information Section */}
        <Grid item xs={12}>
          <Card sx={{ background: 'white' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                About Reporting Tools
              </Typography>
              <Typography>This component introduces an interface to create preliminary reports for Expert Advisory Menu Card Services.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <div></div>
      </Grid>
    </div>
  )
}

export default Dashboard
