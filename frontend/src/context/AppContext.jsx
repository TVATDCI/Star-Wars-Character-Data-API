// Implement global state management using React Context API
import React, { createContext, useState, useEffect, useContext } from "react";
import { getStoredToken, clearStoredToken } from "../components/utils/auth";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [background, setBackground] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [view, setView] = useState("info");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imgUrl = "https://www.transparenttextures.com/patterns/stardust.png";
    setBackground(imgUrl);

    const storedData = getStoredToken();
    if (storedData) {
      setUser(storedData.user);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    setUser(null);
    clearStoredToken();
    console.log("Token, userEmail, and userRole removed from localStorage");
    setView("info");
    alert("You have been logged out successfully.");
  };

  return (
    <AppContext.Provider
      value={{
        background,
        setBackground,
        selectedCharacterId,
        setSelectedCharacterId,
        view,
        setView,
        user,
        setUser,
        loading,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
