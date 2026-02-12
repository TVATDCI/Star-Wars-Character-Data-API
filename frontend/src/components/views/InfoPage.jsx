// src/components/views/InfoPage.jsx
import { useApp } from '../../context/AppContext';
import Button from '../buttons/Button';
import SpaceBtn from '../buttons/SpaceBtn';

export default function InfoPage() {
  const { user } = useApp();

  return (
    <main className='text-center bg-bg-card/50 backdrop-blur-sm p-4 rounded-xl shadow-2xl w-full max-w-2xl mx-auto'>
      <p className='text-lg italic font-dune tracking-wider text-transparent bg-clip-text bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 mb-6'>
        Welcome to{' '}
        <span className='text-test-1'>Star Wars Admin Dashboard</span>.
      </p>

      {user ? (
        <div className='flex flex-col items-center gap-4 mt-6'>
          <h4 className='text-2xl text-error font-bold'>
            Welcome back,{' '}
            {user.name && <span className='text-success'>{user.name}</span>}
          </h4>
          <div className='flex flex-wrap justify-center gap-4'>
            <Button href='/characters'>Characters List</Button>
            <SpaceBtn href='/profile' white>
              View Profile
            </SpaceBtn>
          </div>
        </div>
      ) : (
        <div className='flex flex-wrap justify-center gap-4 mt-6'>
          <Button href='/characters'>View Characters</Button>
          <Button href='/login'>Login</Button>
          <SpaceBtn href='/register' white>
            Register
          </SpaceBtn>
        </div>
      )}

      <SpaceBtn className='mt-10'>
        <a
          href='https://github.com/TVATDCI'
          target='_blank'
          rel='noopener noreferrer'
        >
          DEAD STAR!
        </a>
      </SpaceBtn>
    </main>
  );
}
