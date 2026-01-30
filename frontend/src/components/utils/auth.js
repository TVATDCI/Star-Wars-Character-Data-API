import { jwtDecode } from "jwt-decode";
// # Utility functions for authentication!
// loginUser function has been moved to utils/api.js to keep only localStorage utils
export const storeAuthData = (token, email, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userRole", role);
};

export const getStoredToken = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("userEmail");
  const role = localStorage.getItem("userRole");

  if (!token || !email || !role) return null;
  return { token, user: { email, role } };
};

export const clearStoredToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRole");
};

export const isLoggedIn = () => {
  return !!getStoredToken();
};

// Role decoder moved here to keep auth logic in one place
// For less repetition in components DRY principle!
export const getUserRole = () => {
  const storedToken = getStoredToken()?.token;
  if (!storedToken) return "user"; // Default to 'user' if no token found
  try {
    const decoded = jwtDecode(storedToken);
    return decoded.role || "user"; // Default to 'user' if role is not provided
  } catch (error) {
    console.error("Error decoding token:", error);
    return "user"; // Default to 'user'-Again, if decoding fails
  }
};
