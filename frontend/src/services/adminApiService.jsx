import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api'
});

// Request interceptor to add auth token to every request
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;