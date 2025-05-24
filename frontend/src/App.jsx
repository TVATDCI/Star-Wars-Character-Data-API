import { useState, useEffect } from "react";
import { getStoredToken, clearStoredToken } from "./components/utils/auth";
import "./App.css";
import NebulaCanvas from "./components/spaceAtmos/NebulaCanvas";
import starWarsNeonLogo from "./assets/star-wars-neon.svg";

import Characters from "./components/Characters";
import CharacterDetail from "./components/CharacterDetail";
import CharactersForm from "./components/CharactersForm";
import LoginForm from "./components/reg-auth/LoginForm";
import RegisterForm from "./components/reg-auth/RegisterForm";

import Button from "./components/buttons/Button.jsx";
import ButtonGradient from "./components/buttons/ButtonGradient";
import SpaceBtn from "./components/buttons/SpaceBtn.jsx";
import BtnNeonGradient from "./components/buttons/BtnNeonGradient.jsx";
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
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole"); // Remove userRole as well
    console.log("Token, userEmail and userRole removed from localStorage");
    setView("info");
    alert("You have successfully logged out.");
  };

  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  console.log("User role in App:", user?.role);

  return (
    <>
      <NebulaCanvas className="z-0" />
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center mt-10"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
          zIndex: 0.7,
        }}
      >
        {/* Header/Logo */}
        <header className="flex flex-col items-center text-center py-6 z-30 ">
          <img
            src={starWarsNeonLogo}
            alt="Star Wars Logo"
            className="mb-4 w-48 sm:w-64 md:w-80 lg:w-[28rem] xl:w-[32rem] 2xl:w-[46rem] mx-auto"
          />
          <h2 className="text-2xl text-neutral-800/90 font-bold mt-2">
            Character Database API
          </h2>
        </header>
        {/* Main Content */}
        {view === "info" && (
          <main className="text-center bg-neutral-800/5 backdrop-blur-sm p-4 rounded-xl shadow-2xl mt-2 2xl:mt-0 w-full max-w-2xl mx-auto">
            <p className="text-lg italic font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6 leading-relaxed">
              Welcome to{" "}
              <span className="font-semibold text-[#FFC500] ">
                Star Wars Admin Dashboard
              </span>{" "}
              a full-stack REST API platform built to manage characters from the
              galaxy far, far away. Authenticated users can explore character
              data, while authorized admins have full access to create, update,
              and delete entries in real time, directly from the client side.
              Built with role-based access, MongoDB, and Express, this project
              is a powerful showcase of secure CRUD operations in action.
            </p>
            <p className="text-lg text-yellow-400/50 mt-4 hover:text-yellow-400 leading-relaxed italic ">
              Please register or login to access the database.
              <br />
              Or,{" "}
              <span className="text-[#FFC500] cursor-pointer hover:text-red-500">
                contact me
              </span>{" "}
              to get admin pass for the dashboard
              <br />
            </p>
            {user ? (
              <div className="flex flex-col items-center gap-4">
                <h4 className="text-2xl text-red-400 font-bold">
                  Welcome back, &nbsp;
                  <span className="text-green-500 mb-4">{user.email}!</span>
                </h4>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  <ButtonGradient />
                  <BtnNeonGradient />
                  <Button
                    className="px-6 py-2"
                    onClick={() => setView("characters")}
                  >
                    Characters Lists
                  </Button>
                  <SpaceBtn
                    className="px-6 py-2 text-neutral-300/70 "
                    onClick={handleLogout}
                  >
                    Logout
                  </SpaceBtn>
                </div>
              </div>
            ) : (
              <div className="flex justify-around mb-flex-col items-center gap-4 mt-4">
                <ButtonGradient />
                <BtnNeonGradient />
                <Button className="mt-4" onClick={() => setView("characters")}>
                  Characters
                </Button>

                <Button className="mt-4" onClick={() => setView("login")}>
                  Login
                </Button>
                <Button className="mt-4" onClick={() => setView("register")}>
                  Register
                </Button>
              </div>
            )}
            <SpaceBtn className="mt-10">
              <a
                href="https://github.com/TVATDCI"
                alt="GitHub link to TVATDCI profile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="{alt}"
              >
                DEAD STAR!
              </a>
            </SpaceBtn>
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
            onSave={handleSaveCharacter}
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
    </>
  );
}

export default App;
