import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/api';
import { useApp } from '../../context/AppContext';
import SpaceBtn from '../buttons/SpaceBtn';
import Button from '../buttons/Button';
import toast from 'react-hot-toast';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useApp();

  const validateForm = () => {
    if (!email.trim()) return 'Email is required';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(email, password);
      setUser({ email: result.user.email, role: result.user.role });
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Login failed. Please try again.');
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-bg-card backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-14'>
      <form onSubmit={handleLogin}>
        <h2 className='text-2xl text-error p-2 font-bold mb-6 text-center'>
          Welcome Back
        </h2>

        {error && (
          <div className='mb-4 p-3 bg-error-subtle border border-error rounded-lg text-error text-sm'>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='your@email.com'
              disabled={loading}
              className='w-full p-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 disabled:opacity-50'
            />
          </div>

          <div>
            <label className='block text-text-muted text-sm mb-1'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? 'Signing In...' : 'Sign In'}
          </SpaceBtn>

          <Link to='/'>
            <Button className='block w-full text-center' disabled={loading}>
              Return to Home
            </Button>
          </Link>
        </div>

        <p className='mt-4 text-center text-text-muted text-sm'>
          Don&apos;t have an account?{' '}
          <Link to='/register' className='text-accent hover:text-accent-hover'>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
