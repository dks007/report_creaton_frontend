export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
    authority: import.meta.env.VITE_AUTHORITY, // Replace the placeholder with your tenant subdomain
    redirectUri: import.meta.env.VITE_REDIRECT_URI, // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
    postLogoutRedirectUri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI, // Indicates the page to navigate after logout.
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
