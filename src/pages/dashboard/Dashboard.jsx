
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, IconButton, LinearProgress, Paper } from '@mui/material';
import { Home as HomeIcon, Assignment as AssignmentIcon, BarChart as BarChartIcon, PieChart as PieChartIcon } from '@mui/icons-material';
import IconBreadcrumbs from '../../components/shared/common/IconBreadcrumbs';
import { homeScreen } from '../../constants/static';

import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const Dashboard = () => {
  return (
    <div className='home-page'>
      <h3>Welcome to Success Tool Reporting</h3>
      <IconBreadcrumbs breadcrumbs={homeScreen} />

      <Grid container spacing={3}>
        {/* Information Section */}
        <Grid item xs={12}>
          <Card className='card-wrapper-outer'>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Report creation purpose and guidance
              </Typography>
              <Typography>
                This component introduces an interface to create preliminary reports for Expert Advisory Menu Card Services. This tool will take a Jira Issue ID as input and automatically gather essential information from various sources such as Jira, Service Now, SharePoint, Power BI and the <span className='chip main-color'>IFS Digital Assyst database</span> to generate a draft of the final report. 
              </Typography>
              <Typography>
                The draft is based on the final report template. When a new template is created Project Team needs to be notified of the new report template. The project team will take in the new final report template and do the necessary adjustments to make it compatible with Report Creation tool. The report creation tool will pick the latest available <span className='chip main-color'>final report template from its own repository</span> that is managed by the project team.
              </Typography>
              <Typography className='fw-bold'>
                This tool will only create the final report draft and mention the data that will be placed in the draft automatically. 
              </Typography>
            </CardContent>
          </Card>

          <Card className='card-wrapper-outer'>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Business requirements and references 
              </Typography>
              <Typography className='fw-bold'>
                This tool will only create the final report draft and mention the data that will be placed in the draft automatically. 
              </Typography>
              <ul>
                <li>Interface for creating preliminary reports for Expert Advisory Menu Card Services. </li>
                <li>Input: Jira Issue ID. </li>
                <li>Automated gathering of essential information from various sources (Jira, Service Now, SharePoint, Power BI, IFS Digital Assyst database). </li>
                <li>Draft report generation based on the final report template. </li>
              </ul>
            </CardContent>
          </Card>

          <Card className='card-wrapper-outer'>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Business requirements and references 
              </Typography>
              <Typography>
                There are few links helps you to reach on report listing, create report and report details page.
              </Typography>
              <div className='card-wrapper'>
                {/* card one */}
                <Card>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="https://cdni.iconscout.com/illustration/premium/thumb/mobile-app-settings-1805550-1537823.png?f=webp"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Report Listing
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>

                {/* card 2 */}
                <Card>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="https://cdni.iconscout.com/illustration/premium/thumb/mobile-app-settings-1805550-1537823.png?f=webp"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Create Report
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
                {/* card 3 */}
                <Card>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="https://cdni.iconscout.com/illustration/premium/thumb/mobile-app-settings-1805550-1537823.png?f=webp"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Report Detail page
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <div>
        </div>
      </Grid>
    </div>
  )
}

export default Dashboard

