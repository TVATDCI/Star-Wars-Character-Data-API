const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// utils/api.js
export async function registerUser(email, password) {
  const response = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Prevent crash if empty body
    throw new Error(errorData.error || "Registration failed");
  }

  return response.json(); // only call .json() on OK response
}

// The register function is refactored to keep the code DRY
// 1. Centralized API URL easier to manage endpoints later
// 2. Easier to test and can be reused anywhere in the app!
// Next stop - import this function in the RegisterForm component
