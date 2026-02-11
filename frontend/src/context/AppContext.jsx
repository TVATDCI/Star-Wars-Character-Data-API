// src/context/AppContext.jsx
import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { getStoredAuth, clearStoredAuth } from '../components/utils/auth';

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedData = getStoredAuth();
    return storedData ? storedData.user : null;
  });

  const handleLogout = () => {
    setUser(null);
    clearStoredAuth();
  };

  return (
    <AppContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = { children: PropTypes.node.isRequired };

function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}

export { AppProvider, useApp };
