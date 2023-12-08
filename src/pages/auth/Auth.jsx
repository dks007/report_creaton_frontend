import React from 'react'

import Seo from '../../components/shared/common/Seo'
import { useNavigate } from 'react-router-dom'
import { routePath } from '../../constants/routes'

const Auth = () => {
  const navigate = useNavigate()
  const containerStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundImage:
      'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative'
  }
  const cardStyles = {
    width: '300px',
    backgroundColor: 'white',
    padding: '20px'
  }

  return (
    <div className="container-fluid" style={containerStyles}>
      <Seo title="Login" />
      <div style={cardStyles}>
        <div>IFS Cloud</div>
        <button className="login-azure-btn" onClick={() => navigate(routePath.ISSUE_LISTING)}>
          Login with Azure AD
        </button>
      </div>
    </div>
  )
}

export default Auth
