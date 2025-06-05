import Characters from "./Characters";
import CharacterDetail from "./CharacterDetail";
import CharactersForm from "./CharactersForm";
import LoginForm from "./reg-auth/LoginForm";
import RegisterForm from "./reg-auth/RegisterForm";
import InfoPage from "./views/InfoPage";
import UserProfile from "./views/UserProfile";
import { useApp } from "../context/AppContext";

export default function ViewRouter() {
  const {
    view,
    setView,
    selectedCharacterId,
    setSelectedCharacterId,
    setUser,
  } = useApp();

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

  const handleCancel = () => {
    setView("characters");
  };

  const handleLogin = (user) => {
    console.log("User logged in:", user); // Debugging line
    setUser(user);
    setView("info");
  };

  const handleRegister = () => {
    setView("login");
  };

  const handleProfileUpdate = () => {
    setView("user-profile");
  };

  switch (view) {
    case "info":
      return <InfoPage onRegister={handleRegister} />;

    case "characters":
      return (
        <Characters
          onSelectCharacter={handleSelectCharacter}
          onAddCharacter={handleAddCharacter}
          onClick={handleReturnToInfo}
          returnToInfo={handleReturnToInfo}
        />
      );

    case "characterDetail":
      return (
        <CharacterDetail
          characterId={selectedCharacterId}
          onBack={handleBack}
          onEdit={handleEditCharacter}
        />
      );

    case "charactersForm":
      return (
        <CharactersForm
          characterId={selectedCharacterId}
          onSave={handleSaveCharacter}
          onCancel={handleCancel}
          onBack={handleBack}
        />
      );

    case "login":
      return (
        <LoginForm onLogin={handleLogin} returnToInfo={handleReturnToInfo} />
      );

    case "register":
      return (
        <RegisterForm
          onRegister={handleRegister}
          returnToInfo={handleReturnToInfo}
        />
      );
    case "user-profile":
      return (
        <UserProfile
          returnToInfo={handleReturnToInfo}
          onUpdate={handleProfileUpdate}
        />
      );

    default:
      return <InfoPage />;
  }
}
