import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/routing/ProtectedRoute';
import AdminRoute from './components/routing/AdminRoute';
import NebulaCanvas from './components/spaceAtmos/NebulaCanvas';
import Toaster from './components/ui/Toaster';

// Pages
import InfoPage from './components/views/InfoPage';
import Characters from './components/Characters';
import CharacterDetail from './components/CharacterDetail';
import CharactersForm from './components/CharactersForm';
import LoginForm from './components/reg-auth/LoginForm';
import RegisterForm from './components/reg-auth/RegisterForm';
import UserProfile from './components/views/UserProfile';

const AdminDashboard = () => (
  <div className='p-8 text-center bg-neutral-800/5 backdrop-blur-sm rounded-xl mt-14 max-w-6xl mx-auto'>
    <h1 className='text-2xl text-yellow-400 mb-4'>Admin Dashboard</h1>
    <p className='text-neutral-400'>Coming soon...</p>
  </div>
);

function App() {
  return (
    <AppProvider>
      <div className='min-h-screen bg-neutral-900 relative'>
        <NebulaCanvas className='fixed inset-0 z-0' />
        <div className='relative z-10'>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<InfoPage />} />
              <Route path='characters' element={<Characters />} />
              <Route path='characters/:id' element={<CharacterDetail />} />
              <Route path='login' element={<LoginForm />} />
              <Route path='register' element={<RegisterForm />} />

              <Route
                path='profile'
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path='admin'
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path='characters/edit/:id'
                element={
                  <AdminRoute>
                    <CharactersForm />
                  </AdminRoute>
                }
              />
              <Route
                path='characters/new'
                element={
                  <AdminRoute>
                    <CharactersForm />
                  </AdminRoute>
                }
              />

              <Route path='*' element={<Navigate to='/' replace />} />
            </Route>
          </Routes>
        </div>
        <Toaster />
      </div>
    </AppProvider>
  );
}

export default App;
