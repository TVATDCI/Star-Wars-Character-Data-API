// src/context/AppContext.jsx
import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { getStoredAuth, clearStoredAuth } from '../components/utils/auth';

const AppContext = createContext();

function AppProvider({ children }) {
  const [background] = useState(
    'https://www.transparenttextures.com/patterns/stardust.png'
  );
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [view, setView] = useState('info');
  const [user, setUser] = useState(() => {
    const storedData = getStoredAuth();
    return storedData ? storedData.user : null;
  });

  const handleLogout = () => {
    setUser(null);
    clearStoredAuth();
    setView('info');
    alert('You have successfully logged out.');
  };

  return (
    <AppContext.Provider
      value={{
        background,
        selectedCharacterId,
        setSelectedCharacterId,
        view,
        setView,
        user,
        setUser,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export { AppProvider, useApp };
