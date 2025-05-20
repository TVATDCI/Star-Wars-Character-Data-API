import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode"; // Using the same logic as in Characters.jsx

import ButtonGradient from "../components/buttons/ButtonGradient";
import SpaceBtn from "../components/buttons/SpaceBtn.jsx";
import BtnNeonGradient from "../components/buttons/BtnNeonGradient.jsx";
import Button from "../components/buttons/Button";

function Detail({ label, value }) {
  return (
    <p className="text-neutral-300 font-bold mb-2 ">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-bold">
        {label}:
      </span>{" "}
      {value}
    </p>
  );
}

Detail.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
};

function CharacterDetail({ characterId, onBack, onEdit }) {
  const [userRole, setUserRole] = useState("user"); // default role to user

  // Check if userRole is passed correctly
  console.log("User role in CharacterDetail:", userRole);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    // Decode the token to get the user role
    // repeating the logic from Characters.jsx
    // It can be refactored with a custom hook in the future!!!
    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role || "user"; // if the role is not present, default to user
      setUserRole(role); // Otherwise set the user role in state
    } catch (error) {
      console.error("Error decoding token:", error);
      return;
    }
    // Fetch character details
    fetch(`http://localhost:5000/api/characters/${characterId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unauthorized or failed to fetch character");
        }
        return response.json();
      })
      .then((data) => setCharacter(data))
      .catch((error) => {
        console.error("Error fetching character:", error);
        setCharacter(null); // Optional: reset character if failed
      });
  }, [characterId]);

  console.log("User role in CharacterDetail:", userRole);

  // Show loading state
  if (!character) {
    return <div className="text-neutral-200">Loading character...</div>;
  }

  return (
    <div className="text-center bg-neutral-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl mt-14 w-full max-w-6xl mx-auto">
      {/* Header */}
      <p className="text-sm text-green-400 text-center italic mb-4">
        {userRole === "admin"
          ? "As an admin, you can manage the characters below."
          : "As a user, you can view the available characters."}
      </p>
      {/* Header row */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-between items-center mb-6">
        <Button onClick={onBack} className="text-neutral-300">
          Back
        </Button>
        <ButtonGradient />
        <BtnNeonGradient />
        {userRole === "admin" && (
          <SpaceBtn
            onClick={() => onEdit(characterId)}
            className="font-bold text-neutral-300"
          >
            Edit
          </SpaceBtn>
        )}
      </div>

      {/* Character name */}
      <h2 className="text-3xl text-red-500 font-bold mb-10 ">
        {character.name}
      </h2>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <Detail label="Height" value={`${character.height} cm`} />
        <Detail label="Species" value={character.species} />
        <Detail label="Homeworld" value={character.homeworld} />
        <Detail label="Affiliation" value={character.affiliation} />
        <Detail label="Force Rating" value={character.stats.forceRating} />
        <Detail label="Combat Skill" value={character.stats.combatSkill} />
        <Detail
          label="Piloting Ability"
          value={character.stats.pilotingAbility}
        />
        <Detail
          label="Diplomacy Rating"
          value={character.stats.diplomacyRating}
        />
        <Detail label="Is Jedi" value={character.isJedi ? "Yes" : "No"} />
        <Detail label="Master" value={character.master || "None"} />
        <Detail
          label="Apprentices"
          value={character.apprentices.join(", ") || "None"}
        />
        <Detail
          label="Weapons"
          value={character.weapons.join(", ") || "None"}
        />
        <Detail
          label="Vehicles"
          value={character.vehicles.join(", ") || "None"}
        />
        <Detail
          label="Notable Achievements"
          value={character.notableAchievements.join(", ") || "None"}
        />
      </div>
    </div>
  );
}
CharacterDetail.propTypes = {
  characterId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CharacterDetail;
