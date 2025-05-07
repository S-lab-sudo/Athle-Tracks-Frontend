import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Relative to domain
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
    
  }
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 302) {
      console.error('Unexpected redirect:', error.response.headers.location);
    }
    return Promise.reject(error);
  }
);


export default apiClient;