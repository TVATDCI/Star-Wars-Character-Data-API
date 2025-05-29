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

// utils/api.js - RegisterUser
export async function registerUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleApiError(response); // Generic error handling

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

  const data = await handleApiError(response); // Generic error handling

  return data || { email, role: "user" };
}
