import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { apiRequest } from "./utils/api";
import { getStoredToken, getUserRole } from "./utils/auth";
import PropTypes from "prop-types";

import TextInput from "./form/TextInput";
import NumberInput from "./form/NumberInput";
import ArrayInput from "./form/ArrayInput"; // NOTE: Check module logic in form/ArrayInput.jsx
import CheckboxInput from "./form/CheckboxInput"; // NOTE: Check module logic in form/CheckboxInput.jsx

import BtnNeonGradient from "./buttons/BtnNeonGradient";
import SpaceBtn from "./buttons/SpaceBtn";

function CharacterForm({ characterId, onSave, onCancel }) {
  const [userRole, setUserRole] = useState("user");
  console.log("User role in CharacterForm:", userRole);

  const [character, setCharacter] = useState({
    name: "",
    height: 0,
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
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // check if user is logged in?
  useEffect(() => {
    const storedToken = getStoredToken()?.token;

    if (!storedToken) {
      setError("No authentication token found.");
      return;
    }

    try {
      setLoading(true);
    } catch (err) {
      console.error("Error setting loading state:", err.message);
      setError("Failed to set loading state. Please try again.");
      return;
    }

    // Role decoder is now moved to utils/auth.js
    const role = getUserRole();
    setUserRole(role); // Set user role based on token from utils/auth.js
    console.log("User role", role);

    // Fetch fetchCharactersFormData
    const fetchCharactersFormData = async () => {
      if (!characterId) return;

      try {
        const data = await apiRequest(`/api/characters/${characterId}`);
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
      } catch (error) {
        console.error("Error fetching character:", error.message);
      }
    };

    fetchCharactersFormData();
  }, [characterId]);

  // Modified Handle input changes, converting numeric fields to numbers
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Automatically convert to number if the field is numeric
    const parsedValue = value !== "" && !isNaN(value) ? Number(value) : value;

    console.log(`Updating field: ${name}, Value: ${parsedValue}`); // Debugging log

    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: parsedValue, // Update the field dynamically
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        <h2 className="text-2xl text-red-600 font-bold mb-2">
          {characterId ? "Edit Character" : "Add Character"}
        </h2>
        <TextInput
          label="Name"
          name="name"
          value={character.name}
          onChange={handleChange}
          placeholder="Character Name"
        />
        <NumberInput
          label="Height"
          name="height"
          value={character.height}
          onChange={handleChange}
          placeholder="Height (cm)"
        />
        <TextInput
          label="Species"
          name="species"
          value={character.species}
          onChange={handleChange}
          placeholder="Species"
        />
        <TextInput
          label="Home World"
          name="homeworld"
          value={character.homeworld}
          onChange={handleChange}
          placeholder="Homeworld"
        />
        <TextInput
          label="Affiliation"
          name="affiliation"
          value={character.affiliation}
          onChange={handleChange}
          placeholder="Affiliation"
        />
        <NumberInput
          label="Force Rating"
          name="forceRating"
          value={character.stats.forceRating}
          onChange={handleStatsChange}
          placeholder="Force Rating"
        />
        <NumberInput
          label="Combat Skill"
          name="combatSkill"
          value={character.stats.combatSkill}
          onChange={handleStatsChange}
          placeholder="Combat Skill"
        />
        <NumberInput
          label="Piloting Ability"
          name="pilotingAbility"
          value={character.stats.pilotingAbility}
          onChange={handleStatsChange}
          placeholder="Piloting Ability"
        />
        <NumberInput
          label="Diplomacy Rating"
          name="diplomacyRating"
          value={character.stats.diplomacyRating}
          onChange={handleStatsChange}
          placeholder="Diplomacy Rating"
        />
        <ArrayInput
          label="Weapons"
          name="weapons"
          value={character.weapons}
          onChange={handleArrayChange}
          placeholder="Weapons (comma separated)"
        />
        <ArrayInput
          label="Vehicles"
          name="vehicles"
          value={character.vehicles}
          onChange={handleArrayChange}
          placeholder="Vehicles (comma separated)"
        />
        <CheckboxInput
          label="Is 👾 Jedi ?"
          name="isJedi"
          checked={character.isJedi}
          onChange={(e) =>
            setCharacter((prevCharacter) => ({
              ...prevCharacter,
              isJedi: e.target.checked,
            }))
          }
          placeholder="Is Jedi"
          className="mb-2 p-2 w-full"
        />
        <ArrayInput
          label="Apprentices"
          name="apprentices"
          value={character.apprentices}
          onChange={handleArrayChange}
          placeholder="Apprentices (comma separated)"
        />
        <TextInput
          label="Master"
          name="master"
          value={character.master}
          onChange={handleChange}
          placeholder="Master"
        />
        <ArrayInput
          label="Notable Achievements"
          name="notableAchievements"
          value={character.notableAchievements}
          onChange={handleArrayChange}
          placeholder="Notable Achievements (comma separated)"
        />
        <div className="flex justify-between mt-4">
          <SpaceBtn type="submit" className="text-white">
            Save
          </SpaceBtn>
          <BtnNeonGradient />
          <SpaceBtn type="button" onClick={onCancel} className="text-white">
            Cancel
          </SpaceBtn>
        </div>
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
