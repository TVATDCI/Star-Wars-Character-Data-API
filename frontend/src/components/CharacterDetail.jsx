import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Using the same logic as in Characters.jsx

function Detail({ label, value }) {
  return (
    <p className="text-neutral-200">
      <span className="gradient-text font-semibold">{label}:</span> {value}
    </p>
  );
}

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
    <div className="bg-neutral-800/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-md w-full space-y-4">
      <p className="text-sm text-green-400 italic mb-4">
        {userRole === "admin"
          ? "As an admin, you can manage the characters below."
          : "As a user, you can view the available characters."}
      </p>
      {/* Header row */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-blue-400 hover:text-neutral-100"
        >
          ← Back
        </button>
        {userRole === "admin" && (
          <button
            onClick={() => onEdit(characterId)}
            className="px-3 py-1 font-bold text-neutral-50 bg-yellow-600 hover:bg-yellow-400/10 rounded"
          >
            Edit
          </button>
        )}
      </div>

      {/* Character name */}
      <h2 className="text-3xl text-red-500 font-bold">{character.name}</h2>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

export default CharacterDetail;
