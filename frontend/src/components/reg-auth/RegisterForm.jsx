import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../utils/api';
import SpaceBtn from '../buttons/SpaceBtn';
import Button from '../buttons/Button';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-neutral-800/20 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs mx-auto mt-14">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl text-red-600 p-2 font-bold mb-2">Register</h2>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-2 p-2 w-full bg-neutral-700/50 border border-neutral-600 rounded text-white"
          required
        />
        <input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 p-2 w-full bg-neutral-700/50 border border-neutral-600 rounded text-white"
          required
        />
        <SpaceBtn type="submit" className="w-full text-center text-yellow-400 mb-2">Register</SpaceBtn>
        <Link to="/"><Button className="block w-full text-center">Return to Home</Button></Link>
      </form>
    </div>
  );
}

export default RegisterForm;
