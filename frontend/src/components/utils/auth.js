import { jwtDecode } from 'jwt-decode';

// ============================================
// AUTHENTICATION UTILITY FUNCTIONS
// Dual Token System: Access Token (localStorage) + Refresh Token (HttpOnly Cookie)
// ============================================

/**
 * Store authentication data after successful login
 * @param {string} accessToken - Short-lived JWT (15 min)
 * @param {object} user - User object { id, email, role }
 */
export const storeAuthData = (accessToken, user) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('userEmail', user.email);
  localStorage.setItem('userRole', user.role);
  localStorage.setItem('userId', user.id);
};

/**
 * Get stored access token and user info
 * @returns {object|null} { accessToken, user } or null if not logged in
 */
export const getStoredAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  const email = localStorage.getItem('userEmail');
  const role = localStorage.getItem('userRole');
  const id = localStorage.getItem('userId');

  if (!accessToken || !email || !role) return null;
  return {
    accessToken,
    user: { id, email, role },
  };
};

/**
 * Get just the access token (for API calls)
 * @returns {string|null}
 */
export const getStoredToken = () => {
  return getAccessToken();
};
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

/**
 * Clear all stored authentication data (logout)
 */
export const clearStoredAuth = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userId');
};

/**
 * Check if user is logged in
 * @returns {boolean}
 */
export const isLoggedIn = () => {
  return !!getAccessToken();
};

/**
 * Check if access token is expired
 * @returns {boolean}
 */
export const isTokenExpired = () => {
  const token = getAccessToken();
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    // Check if expired (with 10 second buffer)
    return decoded.exp * 1000 < Date.now() + 10000;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

/**
 * Get user role from token (more secure than localStorage)
 * @returns {string} 'admin' or 'user'
 */
export const getUserRole = () => {
  const token = getAccessToken();
  if (!token) return 'user';

  try {
    const decoded = jwtDecode(token);
    return decoded.role || 'user';
  } catch (error) {
    console.error('Error decoding token:', error);
    return 'user';
  }
};

/**
 * Get user ID from token
 * @returns {string|null}
 */
export const getUserId = () => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.userId || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
