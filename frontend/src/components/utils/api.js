// This file contains the API call for user registration
//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Check if the environment variable is set
//console.log("API_BASE_URL:", API_BASE_URL); // Debugging log

// utils/api.js - RegisterUser
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

// utils/api.js - LoginUser
export async function loginUser(email, password) {
  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Prevent crash if empty body
    throw new Error(errorData.error || "Login failed");
  }

  return response.json(); // return token and user role
}

// The register function is refactored to keep the code DRY
// 1. Extracted API base URL via VITE_API_BASE_URL
// 2. Centralized API URL easier to manage endpoints later
// 3. Easier to test and can be reused anywhere in the app!
// Next stop - import this function in the RegisterForm component
