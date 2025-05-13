import { useState, useEffect } from "react";
import "./App.css";
import starWarsLogo from "./assets/star-wars-gold.svg";

import Characters from "./components/Characters";
import CharacterDetail from "./components/CharacterDetail";
import CharactersForm from "./components/CharactersForm";
import LoginForm from "./components/reg-auth/LoginForm";
import RegisterForm from "./components/reg-auth/RegisterForm";

function App() {
  const [background, setBackground] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [view, setView] = useState("info");
  const [user, setUser] = useState(null);

  // Restore user state from localStorage when the app loads
  useEffect(() => {
    const imgUrl = "https://www.transparenttextures.com/patterns/stardust.png";
    setBackground(imgUrl);

    const token = localStorage.getItem("token");
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserRole = localStorage.getItem("userRole");
    if (token && storedUserEmail && storedUserRole) {
      // Set user state and roll from localStorage
      setUser({ email: storedUserEmail, role: storedUserRole });
    }
  }, []);

  const handleSelectCharacter = (id) => {
    setSelectedCharacterId(id);
    setView("characterDetail");
  };

  const handleBack = () => {
    setView("characters");
  };

  const handleReturnToInfo = () => {
    setView("info");
  };

  const handleAddCharacter = () => {
    setSelectedCharacterId(null);
    setView("charactersForm");
  };

  const handleEditCharacter = (id) => {
    setSelectedCharacterId(id);
    setView("charactersForm");
  };

  const handleSaveCharacter = () => {
    setView("characters");
  };

  const handleLogin = (user) => {
    setUser(user);
    setView("info");
  };

  const handleRegister = () => {
    setView("login");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setUser(null);
    localStorage.removeItem("token");
    console.log("Token removed:", localStorage.getItem("token"));
    localStorage.removeItem("userEmail");
    console.log("User email removed:", localStorage.getItem("userEmail"));
    setView("info");
  };

  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header/Logo */}
      <header className="flex flex-col items-center text-center py-6">
        <h2 className="text-2xl text-red-600 font-bold mb-4">Welcome to</h2>
        <img
          src={starWarsLogo}
          alt="Star Wars Logo"
          className="mb-4 w-48 sm:w-64 md:w-80 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] mx-auto"
        />
        <h2 className="text-2xl text-red-600 font-bold mb-4">
          Character Database API
        </h2>
      </header>
      {/* Main Content */}
      {view === "info" && (
        <main className="text-center bg-neutral-800/10 backdrop-blur-sm p-8 rounded-xl shadow-2xl mt-6 w-full max-w-2xl mx-auto">
          <p className="text-lg text-red-300 mb-6 leading-relaxed">
            Create a{" "}
            <span className="text-yellow-400 font-semibold">
              REST API Admins dashboard
            </span>{" "}
            that manages a database of Star Wars characters. Admins should be
            able to create, read, update, and delete character information
            through various endpoints.
          </p>
          {user ? (
            <div className="flex flex-col items-center gap-4">
              <h4 className="text-2xl text-red-400 font-semi-bold">
                Welcome back, &nbsp;
                <span className="text-green-500 mb-4">{user.email}!</span>
              </h4>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <button
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-950/30 text-white rounded-lg transition-colors duration-300"
                  onClick={() => setView("characters")}
                >
                  Characters Lists
                </button>
                <button
                  className="px-6 py-2 bg-red-400 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 mt-6">
              <a
                className="text-blue-500 hover:text-cyan-400 transition-colors duration-800 cursor-pointer mt-4"
                onClick={() => setView("characters")}
              >
                Characters Lists
              </a>
              <a
                className="text-blue-500 hover:text-cyan-400 transition-colors duration-800 cursor-pointer mt-4"
                onClick={() => setView("login")}
              >
                Login
              </a>
              <a
                className="text-blue-500 hover:text-cyan-400 transition-colors duration-800 cursor-pointer mt-4"
                onClick={() => setView("register")}
              >
                Register
              </a>
            </div>
          )}
        </main>
      )}
      {view === "characters" && (
        <Characters
          onSelectCharacter={handleSelectCharacter}
          returnToInfo={handleReturnToInfo}
          onAddCharacter={handleAddCharacter}
        />
      )}
      {view === "characterDetail" && (
        <CharacterDetail
          characterId={selectedCharacterId}
          onBack={handleBack}
          onEdit={handleEditCharacter}
        />
      )}
      {view === "charactersForm" && (
        <CharactersForm
          characterId={selectedCharacterId}
          onSave={handleSaveCharacter}
          onCancel={handleBack}
        />
      )}
      {view === "login" && <LoginForm onLogin={handleLogin} />}
      {view === "register" && <RegisterForm onRegister={handleRegister} />}
    </div>
  );
}

export default App;
