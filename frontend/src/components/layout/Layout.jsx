import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import starWarsNeonLogo from '../../assets/star-wars-neon.svg';

export default function Layout() {
  const location = useLocation();
  
  console.log('Current route:', location.pathname);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header with Logo */}
      <header className='flex flex-col items-center text-center pt-24 pb-6 z-30 relative'>
        <img 
          src={starWarsNeonLogo} 
          alt='Star Wars Logo' 
          className='mb-4 w-48 sm:w-64 md:w-80' 
        />
        <h2 className='text-2xl text-neutral-100/50 font-dune mt-2'>
          Character Database API
        </h2>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-8">
        <Outlet />
      </main>
    </div>
  );
}
