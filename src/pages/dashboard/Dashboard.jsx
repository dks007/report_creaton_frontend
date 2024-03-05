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
      {/* <h3>{toTitleCase(displayName)}</h3>
      <IconBreadcrumbs breadcrumbs={homeScreen} /> */}

      <div>
        <img src="../src/assets/images/dashboard-layout.svg" alt="Dashboard Layout"></img>
      </div>
    </div>
  )
}

export default Dashboard
