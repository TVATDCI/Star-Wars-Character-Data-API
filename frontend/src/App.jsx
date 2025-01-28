import { useState, useEffect } from "react";
import "./App.css";

import Characters from "./components/Characters";
import CharacterDetail from "./components/CharacterDetail";
import CharactersForm from "./components/CharactersForm";

// reg-auth components
import LoginForm from "./components/reg-auth/LoginForm";
import RegisterForm from "./components/reg-auth/RegisterForm";

function App() {
  const [background, setBackground] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [view, setView] = useState("info");
  useEffect(() => {
    const imgUrl = "https://www.transparenttextures.com/patterns/stardust.png";
    setBackground(imgUrl);
  }, []);

  // Handle Character Selection - Once the view changes to characterDetail.jsx, the selected character's id is passed as a prop
  const handleSelectCharacter = (id) => {
    setSelectedCharacterId(id);
    setView("characterDetail");
  };

  // Handle Back Button
  const handleBack = () => {
    setView("characters");
  };

  // Handle return to Info
  const HandleReturnToInfo = () => {
    setView("info");
  };

  // Handle Add Character
  const handleAddCharacter = () => {
    setSelectedCharacterId(null);
    setView("charactersForm");
  };

  // Handle Edit Character
  const handleEditCharacter = (id) => {
    setSelectedCharacterId(id);
    setView("charactersForm");
  };

  // Handle Save Character
  const handleSaveCharacter = () => {
    setView("characters");
  };

  // Handle Login
  const handleLogin = () => {
    setView("info");
  };

  // Handle Register
  const handleRegister = () => {
    setView("login");
  };

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      {view === "info" && (
        <div className="bg-neutral-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-xs">
          <h1 className="text-3xl text-red-600 font-bold mb-2 ">
            Star Wars Character Database API
          </h1>
          <p className="text-lg gradient-text mb-6">
            Create a REST API that manages a database of Star Wars characters.
            Users should be able to create, read, update, and delete character
            information through various endpoints.
          </p>
          <a
            className=" text-blue-500 hover:text-cyan-400 transition-colors duration-800 cursor-pointer mt-4"
            onClick={() => setView("characters")}
          >
            Characters Lists
          </a>
        </div>
      )}
      {view === "characters" && (
        <Characters
          onSelectCharacter={handleSelectCharacter}
          returnToInfo={HandleReturnToInfo}
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
    </div>
  );
}

export default App;
