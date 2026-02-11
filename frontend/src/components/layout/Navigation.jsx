import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SpaceBtn from '../buttons/SpaceBtn';
import Button from '../buttons/Button';
import toast from 'react-hot-toast';

export default function Navigation() {
  const { user, handleLogout } = useApp();
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    toast.success('You have been logged out.');
    navigate('/');
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-700/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2'>
            <span className='text-2xl font-bold text-yellow-400 font-dune'>
              SW
            </span>
            <span className='text-sm text-neutral-400 hidden sm:block'>
              Character DB
            </span>
          </Link>

          {/* Main Navigation */}
          <div className='flex items-center space-x-4'>
            <Button onClick={() => navigate('/characters')}>Characters</Button>

            {user ? (
              <div className='flex items-center space-x-4'>
                <span className='text-neutral-300 text-sm hidden md:block'>
                  {user.email}
                </span>
                <SpaceBtn onClick={() => navigate('/profile')} white>
                  Profile
                </SpaceBtn>
                {user.role === 'admin' && (
                  <Button onClick={() => navigate('/admin')}>Admin</Button>
                )}
                <Button
                  onClick={onLogout}
                  className='text-red-400 hover:text-red-300'
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className='flex items-center space-x-2'>
                <Button onClick={() => navigate('/login')}>Login</Button>
                <SpaceBtn onClick={() => navigate('/register')} white>
                  Register
                </SpaceBtn>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
