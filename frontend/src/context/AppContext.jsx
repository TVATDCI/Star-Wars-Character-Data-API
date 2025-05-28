// src/context/AppContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { getStoredToken, clearStoredToken } from "../components/utils/auth";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [background, setBackground] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [view, setView] = useState("info");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setBackground("https://www.transparenttextures.com/patterns/stardust.png");
    const storedData = getStoredToken();
    if (storedData) setUser(storedData.user);
  }, []);

  const handleLogout = () => {
    setUser(null);
    clearStoredToken();
    setView("info");
    alert("You have successfully logged out.");
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
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
