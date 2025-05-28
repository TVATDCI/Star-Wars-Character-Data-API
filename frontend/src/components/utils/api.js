// This file contains the API call for user registration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Check if the environment variable is set
if (!API_BASE_URL) {
  console.error(
    "VITE_API_BASE_URL is not defined. Please set it in your .env file."
  );
}

// utils/api.js - RegisterUser
export async function registerUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => ({})); // Prevent crash if empty body

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Prevent crash if empty body
    throw new Error(errorData.error || "Registration failed");
  }

  return {
    email: data.email,
    role: data.role || "user", // Default to 'user' if role is not provided
  };
}
// The register function is refactored to keep the code DRY
// 1. Extracted API base URL via VITE_API_BASE_URL
// 2. Centralized API URL easier to manage endpoints later
// 3. Easier to test and can be reused anywhere in the app!
// Next stop - import this function in the RegisterForm component
