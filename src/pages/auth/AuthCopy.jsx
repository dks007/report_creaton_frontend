import React from 'react'

import Seo from '../../components/shared/common/Seo'
import { useNavigate } from 'react-router-dom'
import { routePath } from '../../constants/routes'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LoginIcon from '@mui/icons-material/Login';

const AuthCopy = () => {
  const navigate = useNavigate()
  const containerStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundImage: 'url("../src/assets/images/login_bg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative',
    padding: '0'
  }
  const cardStyles = {}

  return (
    <div className="container-fluid" style={containerStyles}>
      <Seo title="Login" />
      {/* Login container start */}
      <div style={cardStyles} className="login_container">
        <div className="inner_container">
          <img src="../src/assets/images/login_icon.svg"></img>
          <h1>Success Pilot</h1>
          <p>Click below button to login using Azure AD</p>
          <button
            className="login-azure-btn"
            onClick={() => {
              navigate(routePath.DASHBOARD)
            }}
          >
            {' '}
            <LoginIcon /> Login with Azure AD{' '}
          </button>
          <p>
            <small>Clicking this button will log you into Success Pilot using Azure AD authentication.</small>
          </p>
          <p>
            Facing any difficulties? - <a href="#">Contact support</a>
          </p>
        </div>
      </div>
    </div>
    // login container end here
  )
}

export default AuthCopy
