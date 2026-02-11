import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig.js';
import { getAccessToken, storeAuthData, clearStoredAuth } from './auth.js';

// ============================================
// API CONFIGURATION
// withCredentials: true allows cookies to be sent with requests
// ============================================

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // CRITICAL: Sends HttpOnly cookies automatically
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let refreshSubscribers = [];

// Subscribe to token refresh
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Notify all subscribers with new token
const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// ============================================
// REQUEST INTERCEPTOR
// Automatically attach access token to every request
// ============================================

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// RESPONSE INTERCEPTOR
// Handle 401 errors by refreshing token
// ============================================

api.interceptors.response.use(
  (response) => response.data, // Extract data automatically

  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or request already retried, reject immediately
    if (error.response?.status !== 401 || originalRequest._retry) {
      const message =
        error.response?.data?.message || 'An unexpected error occurred.';
      return Promise.reject(new Error(message));
    }

    // Mark request as retried to prevent infinite loops
    originalRequest._retry = true;

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    // Start token refresh
    isRefreshing = true;

    try {
      // Call refresh endpoint (sends HttpOnly cookie automatically)
      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      const { accessToken } = response.data;

      // Get current user info from existing token or localStorage
      const email = localStorage.getItem('userEmail');
      const role = localStorage.getItem('userRole');
      const id = localStorage.getItem('userId');

      // Store new access token
      storeAuthData(accessToken, { id, email, role });

      // Update original request with new token
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      // Notify all queued requests
      onTokenRefreshed(accessToken);

      isRefreshing = false;

      // Retry original request
      return api(originalRequest);
    } catch {
      // Refresh failed - clear auth and redirect to login
      isRefreshing = false;
      refreshSubscribers = [];
      clearStoredAuth();

      // Redirect to login page
      window.location.href = '/login';

      return Promise.reject(new Error('Session expired. Please login again.'));
    }
  }
);

// ============================================
// AUTH API FUNCTIONS
// ============================================

/**
 * Login user
 * @param {string} email
 * @param {string} password
 * @returns {Promise} { accessToken, user }
 */
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  // Store auth data
  storeAuthData(response.token, response.user);
  return response;
};

/**
 * Register new user
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export const registerUser = async (email, password) => {
  const response = await api.post('/auth/register', { email, password });
  return {
    email: response.email,
    role: response.role || 'user',
  };
};

/**
 * Logout user
 * Clears server-side refresh token and client-side access token
 */
export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearStoredAuth();
    window.location.href = '/login';
  }
};

// ============================================
// GENERIC API REQUEST FUNCTION
// ============================================

/**
 * Generic API request wrapper
 * @param {string} method - HTTP method (GET, POST, PUT, PATCH, DELETE)
 * @param {string} url - API endpoint path
 * @param {object} data - Request body (optional)
 * @returns {Promise} Response data
 */
export const apiRequest = async (method, url, data = null) => {
  const config = {
    method: method.toUpperCase(),
    url,
  };

  if (data && ['POST', 'PUT', 'PATCH'].includes(config.method)) {
    config.data = data;
  }

  return await api.request(config);
};

// ============================================
// CHARACTER API FUNCTIONS
// ============================================

export const getCharacters = async () => {
  return await api.get('/characters');
};

// Add more API functions as needed...

export default api;
