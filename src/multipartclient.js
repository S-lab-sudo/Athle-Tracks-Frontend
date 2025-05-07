import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Relative to domain
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
    
  }
});



export default apiClient;