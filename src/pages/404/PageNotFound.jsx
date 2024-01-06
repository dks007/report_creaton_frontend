import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, Container, Paper } from '@mui/material'

const PageNotFound = () => {
  return (
    <Container>
      <Paper
        elevation={3}
        style={{
          minHeight: '80vh',
          padding: '50px',
          margin: '50px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderRadius: '10px'
        }}
      >
        <Typography variant="h1" style={{ color: '#503998' }}>
          404
        </Typography>
        <Typography variant="h5" style={{ marginBottom: '20px', color: '#424242' }}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '30px', color: '#616161' }}>
          The page you are looking for might be in another castle.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go Home
        </Button>
      </Paper>
    </Container>
  )
}

export default PageNotFound
