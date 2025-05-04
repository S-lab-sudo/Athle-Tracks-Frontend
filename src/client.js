import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Relative to domain
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data'  // Explicitly set content type
  }
});

export default apiClient;