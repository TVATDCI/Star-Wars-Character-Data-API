// components/utils/auth.js
export const getStoredToken = () => {
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");

  if (token && userEmail && userRole) {
    return { token, user: { email: userEmail, role: userRole } };
  }

  return null;
};

export const clearStoredToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRole");
};
