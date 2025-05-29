import { useState } from "react";
import { registerUser } from "../utils/api";
import PropTypes from "prop-types";

// Add customized button component
import SpaceBtn from "../buttons/SpaceBtn";
import Button from "../buttons/Button";
import BtnNeoGradient from "../buttons/BtnNeonGradient";
import ButtonGradient from "../buttons/ButtonGradient";

function RegisterForm({ onRegister, returnToInfo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // One can also generate token directly into storeAuthData and login directly after register
  // by just adding "storeAuthData(result.token, email, result.role)
  // # But below is the 2 steps flow registering logic.
  // NOTE: register logic can be found in utils/api.js_registerUser
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      alert("User registered successfully");
      onRegister();
    } catch (error) {
      alert(error.message);
    }
  };
  // #:(RBAC) role-based access control from the backend!

  return (
    <div className="bg-neutral-800/20 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl text-red-600 p-2 font-bold mb-2">Register</h2>
        <input
          type="email"
          autoComplete="current-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-2 p-2 w-full"
        />
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-2 p-2 w-full"
        />
        <BtnNeoGradient />
        <ButtonGradient />
        <SpaceBtn type="submit" className="mt-4 text-center text-yellow-400">
          Register
        </SpaceBtn>
        <Button onClick={returnToInfo} className="block ml-2 text-center">
          Return to Info
        </Button>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
  returnToInfo: PropTypes.func.isRequired,
};

export default RegisterForm;
