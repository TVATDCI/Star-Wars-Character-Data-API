import { useState } from "react";
import { loginUser } from "../utils/api";
import { storeAuthData } from "../utils/auth";
import PropTypes from "prop-types";
import SpaceBtn from "../buttons/SpaceBtn";
import BtnNeoGradient from "../buttons/BtnNeonGradient";
import Button from "../buttons/Button.jsx";
import ButtonGradient from "../buttons/ButtonGradient.jsx";

function LoginForm({ onLogin, returnToInfo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // NOTE: the handleSubmit function logic is now abstracted
  // #The loginUser function now returns as loginUser(email, password) from utils/api.js
  // #The data is from storeAuthData function in utils/auth.js
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(email, password); // contains token and role
      storeAuthData(result.token, email, result.role); // persist to localStorage
      onLogin({ email, role: result.role }); // call parent with user info
    } catch (err) {
      alert(err.message); // Already exists in loginUser, but is here for user feedback
    }
  };

  return (
    <div className="bg-neutral-800/20 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
      <form onSubmit={handleLogin}>
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
        <ButtonGradient />
        <SpaceBtn type="submit" className="mt-4 text-center text-yellow-400">
          Login
        </SpaceBtn>
        <Button onClick={returnToInfo} className="block ml-6 text-center">
          Return to Info
        </Button>
      </form>
    </div>
  );
}
LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  returnToInfo: PropTypes.func.isRequired,
};

export default LoginForm;
