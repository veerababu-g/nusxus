import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// Attach the admin token (if present) to every request.
// Credentials are never hard-coded here - they only ever come from localStorage
// after a successful /admin/login call.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nexus_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If a token expires or is rejected, clear it so the app falls back to the login screen.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('nexus_admin_token');
      localStorage.removeItem('nexus_admin_user');
    }
    return Promise.reject(error);
  }
);

export default api;
