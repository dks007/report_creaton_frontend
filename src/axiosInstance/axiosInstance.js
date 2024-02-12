import axios from 'axios';

// Create an instance of Axios with a base URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL // Base URL for API requests
});

// Add an interceptor to modify outgoing requests
axiosInstance.interceptors.request.use(
  // Function to modify the request config
  (config) => {
    // Retrieve the authentication token from sessionStorage
    const token = sessionStorage.getItem('authToken');

    // If a token is found, add it to the request headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to Authorization header
    }

    // Return the modified config
    return config;
  },
  // Function to handle errors
  (error) => {
    // Reject the Promise with the error object
    return Promise.reject(error);
  }
);

// Export the configured Axios instance
export default axiosInstance;
