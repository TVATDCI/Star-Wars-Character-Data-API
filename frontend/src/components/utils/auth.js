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
