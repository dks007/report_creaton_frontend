import React from 'react'
import { Container, Typography, Grid, Card, CardContent, IconButton, LinearProgress, Paper } from '@mui/material'
import { Home as HomeIcon, Assignment as AssignmentIcon, BarChart as BarChartIcon, PieChart as PieChartIcon } from '@mui/icons-material'
import IconBreadcrumbs from '../../components/shared/common/IconBreadcrumbs'
import { homeScreen } from '../../constants/static'

const Dashboard = () => {
  return (
    <div>
      <h3>Welcome to Reporting Tools</h3>
      <IconBreadcrumbs breadcrumbs={homeScreen} />

      <Grid container spacing={3} className="mt-4">
        {/* Information Section */}
        <Grid item xs={12}>
          <Card sx={{ background: 'white' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                About Reporting Tools
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptatibus libero quasi, incidunt nobis neque sit similique
                laborum rem ea placeat optio voluptates dicta veritatis beatae cumque quos amet odio officiis at aut accusamus. Officia consectetur
                fuga nam, consequuntur dolor magni quaerat eveniet eius veniam quam architecto nesciunt inventore dolorem.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
