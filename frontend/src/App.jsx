import NebulaCanvas from './components/spaceAtmos/NebulaCanvas';
import starWarsNeonLogo from './assets/star-wars-neon.svg';
import ViewRouter from './components/ViewRouter';
import { AppProvider, useApp } from './context/AppContext';
import './App.css';

function Layout() {
  const { background } = useApp();

  return (
    <>
      <NebulaCanvas className='z-0' />
      <div
        className='min-h-screen flex flex-col items-center justify-center bg-cover mt-10'
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
          zIndex: 0.7,
        }}
      >
        <header className='flex flex-col items-center text-center py-6 z-30'>
          <img
            src={starWarsNeonLogo}
            alt='Star Wars Logo'
            className='mb-4 w-48 sm:w-64 md:w-80 lg:w-md'
          />
          <h2 className='text-2xl text-neutral-100/50 font-dune mt-2'>
            Character Database API
          </h2>
        </header>
        <ViewRouter />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
