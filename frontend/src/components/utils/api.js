// Central API_BASE_URL for all API calls!
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Check if the environment variable is set
if (!API_BASE_URL) {
  console.error(
    "VITE_API_BASE_URL is not defined. Please set it in your .env file."
  );
}

// Create a Generic API request function
// utils/api.js - Generic API request function
{
  /*
    export async function apiRequest(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "API request failed");
  }

  return response.json();
}
*/
}

// utils/api.js - RegisterUser
export async function registerUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Registration failed");
  }

  return {
    email: data.email,
    role: data.role || "user", // Default to 'user' if role is not provided
  };
}

// utils/api.js - LoginUser
export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data || { email, role: "user" };
}
