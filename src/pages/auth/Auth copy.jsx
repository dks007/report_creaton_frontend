import React from 'react'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../config/authConfig'
import Seo from '../../components/shared/common/Seo'

const Auth = () => {
  const { instance } = useMsal()

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: 'create'
      })
      .catch((error) => console.log(error))
  }
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
  const dividerStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  const dividerLineStyle = {
    flex: 1,
    borderBottom: '1px solid #000',
    marginLeft: 10,
    marginRight: 10
  }
  return (
    <div className="container-fluid" style={containerStyles}>
      <Seo title="Login" />
      <div style={cardStyles}>
        <div>IFS Cloud</div>
        <button className="login-azure-btn" onClick={handleRedirect}>
          Login with Azure AD
        </button>
      </div>
    </div>
  )
}

export default Auth
