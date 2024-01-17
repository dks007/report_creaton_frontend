import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, Container, Paper, Box } from '@mui/material'
import ImageElement from '../../components/shared/common/ImageElement'
import { error404 } from '../../assets/Images/images'

const PageNotFound = () => {
  return (
    <Box className='notfound-page-container'>
      <Box className='back-bg'></Box>
      <Box className='er-inr-wrapper'>
        <Box className='er-inr-content'>
          <h1 className="error-title">404</h1>
          <h6 className="error-title">Oops! the page not found.</h6>
          <p className="error-subtitle">Sorry, the page you were looking for at this URL was not found.</p>
          <Button variant="contained" sx={{ padding: 1.5, borderRadius: 3, marginTop: 4 }} component={Link} to="/">
            Go back to homepage
          </Button>
        </Box>
      </Box>
      <Box className="contact-support">Facing any difficulties?  -  <a href='javascript();'>Contact support</a></Box>
    </Box>
  )
}

export default PageNotFound
