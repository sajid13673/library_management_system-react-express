export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:5001',
  baseApiUrl: import.meta.env.VITE_APP_API_BASE_API_URL || 'http://localhost:5001/api',
  timeout: 5000,
};