import axios from 'axios';
import { BASE_URL } from './constants';

// Axios instance for real backend calls
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      headers: config.headers,
      withCredentials: config.withCredentials
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data
    });
    return Promise.reject(error);
  }
);


export const apiService = {
  
  // Authentication
  async login(email, password) {
    // if (USE_MOCK_BACKEND) {
    //   return await mockBackendAPI.login(email, password);
    // }
    
    try {
      console.log('Attempting login with:', { email, passwordLength: password.length });
      const response = await apiClient.post('/login', { email, password });
      console.log('Login successful:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Login failed:', {
        status: error.response?.status,
        message: error.response?.data,
        email: email
      });
      throw new Error(error.response?.data?.message || error.response?.data || 'Login failed');
    }
  },
}


