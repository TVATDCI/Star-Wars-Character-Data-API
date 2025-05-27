import { useState } from "react";
import { loginUser } from "../utils/api"; // Add refactored API loginUser function
import { storeAuthData } from "../utils/auth"; // Import extra stareAuthData for loginUser only!
import PropTypes from "prop-types";
import SpaceBtn from "../buttons/SpaceBtn";
import BtnNeoGradient from "../buttons/BtnNeonGradient";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // NOTE: the handleSubmit function logic is now abstracted away to // utils/api.js and utils/auth.js for reusability experiment!
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password); // { token, role }

      storeAuthData(data.token, email, data.role); // now abstracted away

      onLogin({ email, role: data.role }); // pass to parent
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="bg-neutral-800/20 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl text-red-600 p-2 font-bold mb-2">Login</h2>
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
        {/* Future plan - add a checkbox for "Remember Me" */}
        <BtnNeoGradient />
        <SpaceBtn type="submit" className="mt-4 text-center text-yellow-400">
          Login
        </SpaceBtn>
      </form>
    </div>
  );
}
LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
