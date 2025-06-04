// import getStoredToken from localStorage to create a user session
import { getStoredToken } from "./auth";

// Central API_BASE_URL for all API calls!
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Check if the environment variable is set
if (!API_BASE_URL) {
  console.error(
    "VITE_API_BASE_URL is not defined. Please set it in your .env file."
  );
}

// utils/api.js - Generic API errors handling
function handleApiError(response) {
  if (!response.ok) {
    return response
      .json()
      .catch(() => ({}))
      .then((errorData) => {
        throw new Error(
          errorData.error || "An error occurred while processing your request."
        );
      });
  }
  return response.json().catch(() => ({}));
}

// utils/api.js - Generic API request function
// # Method stand alone!
// - Construct headers object based on the presence of a token
// - Define headers object once and pass  it to options
// - Use spread with AND (...(body &&{...})) operator
export async function apiRequest(
  endpoint,
  method = "GET",
  body = null,
  token = null
) {
  const authToken = token || getStoredToken()?.token; // Use provided token or get from localStorage
  const headers = {
    "Content-Type": "application/json",
    ...(authToken && { Authorization: `Bearer ${authToken}` }), // Conditionally add Authorization header
  };

  const options = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  console.log("Sending API request to endpoint:", `${API_BASE_URL}${endpoint}`);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  return handleApiError(response);
}

// # RegisterUser using generic apiRequest
export async function registerUser(email, password) {
  const response = await apiRequest("/register", "POST", { email, password });
  return {
    email: response.email,
    role: response.role || "user", // Default to 'user' if role is not provided
  };
}

// # LoginUser using generic apiRequest
export async function loginUser(email, password) {
  const response = await apiRequest("/login", "POST", { email, password });
  return response || { email, role: "user" };
}

//# Initiating the registerUser function
// utils/api.js - RegisterUser
//export async function registerUser(email, password) {
//  const response = await fetch(`${API_BASE_URL}/register`, {
//    method: "POST",
//    headers: { "Content-Type": "application/json" },
//    body: JSON.stringify({ email, password }),
//  });
//
//  const data = await handleApiError(response); // Generic error handling
//
//  return {
//    email: data.email,
//    role: data.role || "user", // Default to 'user' if role is not provided
//  };
//}

// # Initiating the loginUser function
// utils/api.js - LoginUser
//export async function loginUser(email, password) {
//  const response = await fetch(`${API_BASE_URL}/login`, {
//    method: "POST",
//    headers: { "Content-Type": "application/json" },
//    body: JSON.stringify({ email, password }),
//  });
//
//  const data = await handleApiError(response); // Generic error handling
//
//  return data || { email, role: "user" };
//}
