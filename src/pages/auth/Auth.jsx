import React, { useState } from 'react'
import Seo from '../../components/shared/common/Seo'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../config/authConfig'
import Loader from '../../components/shared/common/Loader'

const Auth = () => {
  const { instance } = useMsal()
  const [loading, setLoading] = useState(false)
  const handleRedirect = () => {
    setLoading(true)
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: 'create'
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

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
      {/* Display loader if loading state is true */}
      {loading && <Loader />}

      {/* Login container start */}
      <div style={cardStyles} className="login_container">
        <div className="inner_container">
          <img src="../src/assets/images/login_icon.svg" alt="Login Icon"></img>
          <h1>IFS Digital Assyst</h1>
          <p>Click below button to login using Azure AD</p>
          <button className="login-azure-btn" onClick={handleRedirect}>
            <AccountBoxIcon /> Login with Azure AD{' '}
          </button>
          <p>
            <small>Clicking this button will log you into Success Delivery IFS Digital Assyst using Azure AD authentication.</small>
          </p>
          <p>
            Facing any difficulties? - <a href="#">Contact support</a>
          </p>
        </div>
      </div>
      {/* login container end here */}
    </div>
  )
}

export default Auth
