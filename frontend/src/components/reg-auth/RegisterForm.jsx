import { useState } from "react";

function RegisterForm({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("User registered successfully");
      onRegister();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="bg-neutral-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-xs">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl text-red-600 font-bold mb-4">Register</h2>
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
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
