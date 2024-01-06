import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, Container, Paper, Box } from '@mui/material'
import ImageElement from '../../components/shared/common/ImageElement'
import { error404 } from '../../assets/Images/images'

const PageNotFound = () => {
  return (
    <Box sx={{ width: { xs: '100%', md: '90%' }, margin: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: { xs: 5, md: 0 }
        }}
      >
        <Box sx={{}}>
          <h1 className="error-title">Page not found</h1>
          <h3 className="error-subtitle">Sorry, the page you were looking for at this URL was not found.</h3>
          <Button variant="contained" sx={{ padding: 1.5, borderRadius: 3, marginTop: 4 }} component={Link} to="/">
            Go back to homepage
          </Button>
        </Box>
        <Box sx={{}}>
          <ImageElement src={error404} className="error-page-image" />
        </Box>
      </Box>
    </Box>
  )
}

export default PageNotFound
