import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig.js';
import { getStoredToken } from './auth.js';

// 1. reusable Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Prepared for future HTTP-Only cookie security.
});

// Temporary generic API request function using Axios
export async function apiRequest(endpoint, method = 'GET', body = null) {
  try {
    // Just return the response directly; the interceptor already extracted .data
    return await api({
      url: endpoint,
      method: method,
      data: body,
    });
  } catch (error) {
    // This catches the re-thrown error from the interceptor
    throw error;
  }
}

// 2. Request Interceptor: Automatically attach the Bearer token if it exists.
api.interceptors.request.use(
  (config) => {
    const auth = getStoredToken();
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`; // Standardized Bearer logic.
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Centralized error formatting.
api.interceptors.response.use(
  (response) => response.data, // Automatically extract data so you don't call .json().
  (error) => {
    // Axios catches 4xx and 5xx errors automatically.
    const message =
      error.response?.data?.error || 'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

/**
 * Auth Functions / api requests
 * Note: vite.config.js will rewrites, calling '/login'
 * triggers the proxy to reach '/api/v1/auth/login'.
 */

export const loginUser = async (email, password) => {
  return await api.post('/login', { email, password });
};

export const registerUser = async (email, password) => {
  const response = await api.post('/register', { email, password });
  return {
    email: response.email,
    role: response.role || 'user', // Consistent fallback from nativeApi.js
  };
};

export const getCharacters = async () => {
  return await api.get('/characters'); // Interceptor adds the token automatically!.
};

export default api;
