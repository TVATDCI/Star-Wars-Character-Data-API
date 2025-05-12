import { useState } from "react";
import PropTypes from "prop-types";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Login response:", data); // check if the backend is returning the expected data
      if (response.ok) {
        console.log("Token received:", data.token); // Check if the token is received
        localStorage.setItem("token", data.token); // Store the token in local storage
        localStorage.setItem("userEmail", email); // Store EXTRA user email in local storage
        onLogin({ email }); // Pass the user email to the onLogin callback
      } else {
        console.error("Login failed:", data.error); // Debugging log
        alert(data.error);
      }
    } catch (error) {
      console.error("Error during login:", error); // Debugging log
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-neutral-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-xs">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl text-red-600 font-bold mb-4">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-2 p-2 w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-2 p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
