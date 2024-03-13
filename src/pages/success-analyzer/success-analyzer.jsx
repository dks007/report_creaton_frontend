import React from 'react'
import { Container, Typography, Grid, Card, CardContent, IconButton, LinearProgress, Paper } from '@mui/material'
import { Home as HomeIcon, Assignment as AssignmentIcon, BarChart as BarChartIcon, PieChart as PieChartIcon } from '@mui/icons-material'
import IconBreadcrumbs from '../../components/shared/common/IconBreadcrumbs'
import { homeScreen } from '../../constants/static'

import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import { toTitleCase } from '../../utils/helperFunction'

const SuccessAnalyzer = ({ displayName }) => {
  return (
    <div className="home-page">
      {/* <h3>{toTitleCase(displayName)}</h3>
      <IconBreadcrumbs breadcrumbs={homeScreen} /> */}

      <div>
      <iframe title="STA - Usage Analyzer - Success Customer Superset" className='success-analyzer-api' src="https://app.powerbi.com/reportEmbed?reportId=b4528630-7d93-4053-ad25-774cfaee3f3f&autoAuth=true&ctid=afadec18-0533-4cba-8578-5316252ff93f" frameborder="0" allowFullScreen="true"></iframe>
      </div>
    </div>
  )
}

export default SuccessAnalyzer
