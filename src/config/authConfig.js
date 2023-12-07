export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MICROSOFT_CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
    authority: 'https://login.microsoftonline.com/dilipku007gmail.onmicrosoft.com', // Replace the placeholder with your tenant subdomain
    redirectUri: '/', // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
    postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
  }
}

export const loginRequest = {
  scopes: ['user.read']
}
