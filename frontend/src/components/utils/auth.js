// # Utility functions for authentication!
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

export const loginUser = async (email, password) => {
  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Login failed");

    storeAuthData(data.token, email, data.role);
    return { email, role: data.role };
  } catch (err) {
    console.error(err.message);
    alert(err.message);
    return null;
  }
};
