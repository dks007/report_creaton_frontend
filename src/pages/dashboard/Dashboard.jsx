import React from 'react'
import { Container, Typography, Grid, Card, CardContent, IconButton, LinearProgress, Paper } from '@mui/material'
import { Home as HomeIcon, Assignment as AssignmentIcon, BarChart as BarChartIcon, PieChart as PieChartIcon } from '@mui/icons-material'
import IconBreadcrumbs from '../../components/shared/common/IconBreadcrumbs'
import { homeScreen } from '../../constants/static'

import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import { toTitleCase } from '../../utils/helperFunction'

const Dashboard = ({ displayName }) => {
  return (
    <div className="home-page">
      <h3>{toTitleCase(displayName)}</h3>
      <IconBreadcrumbs breadcrumbs={homeScreen} />

      <Grid container spacing={3}>
        {/* Information Section */}
        <Grid item xs={12}>
          <Card className="card-wrapper-outer">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Purpose and guidance
              </Typography>
              <Typography>
                Welcome to Success Delivery Report Composer! This powerful interface simplifies the process of generating preliminary reports for your
                Expert Service Menu Cards. By automatically fetching or inputting the Jira Issue ID, our tool seamlessly extracts vital information
                from Jira, Service Now, SharePoint, Power BI, and our system database. The result? A comprehensive draft of your final report,{' '}
                <span className="chip main-color">automatically</span> assembled based on the latest template that is published.
              </Typography>
              <Typography>
                Stay informed effortlessly – our tool notifies the Project Team of any new report template creation. The Project Team ensures
                compatibility by making necessary adjustments, allowing the Report Creation Tool to seamlessly integrate the latest template from its
                dedicated repository.
              </Typography>
              <Typography className="fw-bold">
                Efficiency meets precision – our tool focuses on crafting the final report draft, automatically populating it with the essential data.
                Experience streamlined reporting with our intuitive and time-saving solution.
              </Typography>
            </CardContent>
          </Card>

          <Card className="card-wrapper-outer">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Business requirements and references
              </Typography>
              <Typography className="fw-bold">
                This tool exclusively focuses on the creation of final report drafts, providing a seamless and efficient solution for your reporting
                needs.
              </Typography>
              <Typography className="fw-bold">Business Requirements:</Typography>
              <ul>
                <li>Solely generates final report drafts.</li>
                <li>Automatically populates essential data into the draft.</li>
                <li>Centralizes reports into a SharePoint repository to prevent duplication.</li>
              </ul>
              <Typography>
                <span className="fw-bold">References:</span> Explore the functionalities of our interface designed for creating preliminary reports
                for Success Delivery Expert Menu Card Services:
              </Typography>
              <ul>
                <li>
                  <span className="fw-bold">Input:</span> Utilize the Jira Issue ID as the key input for the reporting process.
                </li>
                <li>
                  <span className="fw-bold">Automated Data Gathering:</span> Effortlessly gather critical information from diverse sources, including
                  Jira, Service Now, SharePoint, Power BI, and system database.
                </li>
                <li>
                  <span className="fw-bold">Draft Report Generation:</span> Experience the convenience of draft report creation, crafted in alignment
                  with the final report template.{' '}
                </li>
              </ul>
              <Typography>Streamline your reporting process with precision and ease using the powerful capabilities of Report Composer.</Typography>
            </CardContent>
          </Card>

          <Card className="card-wrapper-outer">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Business requirements and references
              </Typography>
              <Typography>There are few links helps you to reach on report listing, create report and report details page.</Typography>
              <div className="card-wrapper">
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
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
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
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
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
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
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
        <div></div>
      </Grid>
    </div>
  )
}

export default Dashboard
