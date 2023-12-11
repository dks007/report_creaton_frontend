import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

/* The `axiosInstance.interceptors.request.use()` function is used to intercept and modify outgoing
requests made using the `axiosInstance` object. */

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/* The `axiosInstance.interceptors.response.use()` function is used to intercept and handle responses
from outgoing requests made using the `axiosInstance` object. */
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
