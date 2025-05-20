import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

function CharacterForm({ characterId, onSave, onCancel }) {
  const [userRole, setUserRole] = useState("user");
  console.log("User role in CharacterForm:", userRole);

  const [character, setCharacter] = useState({
    name: "",
    species: "",
    homeworld: "",
    affiliation: "",
    stats: {
      forceRating: 0,
      combatSkill: 0,
      pilotingAbility: 0,
      diplomacyRating: 0,
    },
    weapons: [],
    vehicles: [],
    isJedi: false,
    apprentices: [],
    master: "",
    notableAchievements: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role || "user";
      setUserRole(role);
    } catch (error) {
      console.error("Error decoding token:", error);
      return;
    }

    if (characterId) {
      fetch(`http://localhost:5000/api/characters/${characterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            ...data,
            stats: {
              forceRating: data.stats?.forceRating || 0,
              combatSkill: data.stats?.combatSkill || 0,
              pilotingAbility: data.stats?.pilotingAbility || 0,
              diplomacyRating: data.stats?.diplomacyRating || 0,
            },
          }));
        })
        .catch((error) => console.error("Error fetching character:", error));
    }
  }, [characterId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleStatsChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      stats: { ...prevCharacter.stats, [name]: value },
    }));
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [field]: value.split(","),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = characterId ? "PUT" : "POST";
    const url = characterId
      ? `http://localhost:5000/api/characters/${characterId}`
      : "http://localhost:5000/api/characters";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    })
      .then((response) => response.json())
      .then((data) => {
        onSave(data);
      })
      .catch((error) => console.error("Error saving character:", error));
  };

  return (
    <div className="text-center bg-neutral-800/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl mt-14 w-full max-w-6xl mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl text-red-600 font-bold mb-4">
          {characterId ? "Edit Character" : "Add Character"}
        </h2>
        <input
          type="text"
          name="name"
          value={character.name}
          onChange={handleChange}
          placeholder="Name"
          className="mb-2 p-2 w-full "
        />
        <input
          type="text"
          name="species"
          value={character.species}
          onChange={handleChange}
          placeholder="Species"
          className="mb-2 p-2 w-full"
        />
        <input
          type="text"
          name="homeworld"
          value={character.homeworld}
          onChange={handleChange}
          placeholder="Homeworld"
          className="mb-2 p-2 w-full"
        />
        <input
          type="text"
          name="affiliation"
          value={character.affiliation}
          onChange={handleChange}
          placeholder="Affiliation"
          className="mb-2 p-2 w-full"
        />
        <input
          type="number"
          name="forceRating"
          value={character.stats.forceRating}
          onChange={handleStatsChange}
          placeholder="Force Rating"
          className="mb-2 p-2 w-full"
        />
        <input
          type="number"
          name="combatSkill"
          value={character.stats.combatSkill}
          onChange={handleStatsChange}
          placeholder="Combat Skill"
          className="mb-2 p-2 w-full"
        />
        <input
          type="number"
          name="pilotingAbility"
          value={character.stats.pilotingAbility}
          onChange={handleStatsChange}
          placeholder="Piloting Ability"
          className="mb-2 p-2 w-full"
        />
        <input
          type="number"
          name="diplomacyRating"
          value={character.stats.diplomacyRating}
          onChange={handleStatsChange}
          placeholder="Diplomacy Rating"
          className="mb-2 p-2 w-full"
        />
        <input
          type="text"
          name="weapons"
          value={character.weapons.join(",")}
          onChange={(e) => handleArrayChange(e, "weapons")}
          placeholder="Weapons (comma separated)"
          className="mb-2 p-2 w-full"
        />
        <input
          type="text"
          name="vehicles"
          value={character.vehicles.join(",")}
          onChange={(e) => handleArrayChange(e, "vehicles")}
          placeholder="Vehicles (comma separated)"
          className="mb-2 p-2 w-full"
        />
        <label className="mb-2 p-2 w-full">
          <input
            type="checkbox"
            name="isJedi"
            checked={character.isJedi}
            onChange={(e) =>
              setCharacter((prevCharacter) => ({
                ...prevCharacter,
                isJedi: e.target.checked,
              }))
            }
          />
          Is Jedi
        </label>
        <input
          type="text"
          name="apprentices"
          value={character.apprentices.join(",")}
          onChange={(e) => handleArrayChange(e, "apprentices")}
          placeholder="Apprentices (comma separated)"
          className="mb-2 p-2 w-full"
        />
        <input
          type="text"
          name="master"
          value={character.master}
          onChange={handleChange}
          placeholder="Master"
          className="mb-2 p-2 w-full"
        />
        <input
          type="text"
          name="notableAchievements"
          value={character.notableAchievements.join(",")}
          onChange={(e) => handleArrayChange(e, "notableAchievements")}
          placeholder="Notable Achievements (comma separated)"
          className="mb-2 p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 text-white p-2 rounded ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
CharacterForm.propTypes = {
  characterId: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CharacterForm;
