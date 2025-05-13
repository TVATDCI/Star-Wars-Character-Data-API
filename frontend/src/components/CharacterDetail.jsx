import { useState, useEffect } from "react";

function Detail({ label, value }) {
  return (
    <p className="text-neutral-200">
      <span className="gradient-text font-semibold">{label}:</span> {value}
    </p>
  );
}

function CharacterDetail({ characterId, onBack, onEdit, onSave, userRole }) {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in.");
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
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-neutral-800/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-md w-full space-y-4">
      {/* Header row */}
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-blue-400 hover:text-cyan-400">
          ← Back
        </button>
        {userRole === "admin" && (
          <button
            onClick={() => onEdit(characterId)}
            className="px-3 py-1 bg-yellow-600 rounded"
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
