import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../utils/api';
import SpaceBtn from '../buttons/SpaceBtn';
import Button from '../buttons/Button';
import toast from 'react-hot-toast';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim()) return 'Email is required';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await registerUser(email, password);
      toast.success('Account created successfully! Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-neutral-800/20 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-14'>
      <form onSubmit={handleSubmit}>
        <h2 className='text-2xl text-red-600 p-2 font-bold mb-6 text-center'>
          Create Account
        </h2>

        {error && (
          <div className='mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm'>
            {error}
          </div>
        )}

        <div className='space-y-4'>
          <div>
            <label className='block text-neutral-300 text-sm mb-1'>
              Email Address
            </label>
            <input
              type='email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='your@email.com'
              disabled={loading}
              className='w-full p-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 disabled:opacity-50'
            />
          </div>

          <div>
            <label className='block text-neutral-300 text-sm mb-1'>
              Password
            </label>
            <input
              type='password'
              autoComplete='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              disabled={loading}
              className='w-full p-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 disabled:opacity-50'
            />
            <p className='text-neutral-500 text-xs mt-1'>
              Must be at least 6 characters
            </p>
          </div>

          <div>
            <label className='block text-neutral-300 text-sm mb-1'>
              Confirm Password
            </label>
            <input
              type='password'
              autoComplete='new-password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='••••••••'
              disabled={loading}
              className='w-full p-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 disabled:opacity-50'
            />
          </div>
        </div>

        <div className='mt-6 space-y-3'>
          <SpaceBtn
            type='submit'
            className='w-full text-center justify-center'
            white
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </SpaceBtn>

          <Link to='/'>
            <Button className='block w-full text-center' disabled={loading}>
              Return to Home
            </Button>
          </Link>
        </div>

        <p className='mt-4 text-center text-neutral-400 text-sm'>
          Already have an account?{' '}
          <Link to='/login' className='text-yellow-400 hover:text-yellow-300'>
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
