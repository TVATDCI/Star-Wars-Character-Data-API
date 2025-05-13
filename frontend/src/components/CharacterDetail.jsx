import { useState, useEffect } from "react";

function CharacterDetail({ characterId, onBack, onEdit }) {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

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
  // Show loading state
  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-neutral-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-xs">
      <div className="flex justify-between items-center ">
        <button
          onClick={onBack}
          className="text-blue-500 hover:text-cyan-400 transition-colors duration-800  mb-4 cursor-pointer "
        >
          Back
        </button>
        <button
          onClick={() => onEdit(characterId)}
          className="bg-yellow-500 text-red-600 px-1 rounded ml-2 mb-4"
        >
          Edit
        </button>
      </div>

      <h2 className="text-2xl text-red-600 font-bold mb-4">{character.name}</h2>
      <p className="text-lg text-neutral-200 ">
        <span className="gradient-text">Species:</span>
        {character.species}
      </p>
      <p className="text-lg text-neutral-200">
        <span className="gradient-text">Homeworld:</span> {character.homeworld}
      </p>
      <p className="text-lg text-neutral-200">
        <span className="gradient-text">Affiliation:</span>{" "}
        {character.affiliation}
      </p>
      <p className="text-lg text-neutral-200">
        <span className="gradient-text">Force Rating:</span>{" "}
        {character.stats.forceRating}
      </p>
      <p className="text-lg text-neutral-200">
        <span className="gradient-text">Combat Skill:</span>{" "}
        {character.stats.combatSkill}
      </p>
      <p className="text-lg text-neutral-200">
        <span className="gradient-text">Piloting Ability:</span>{" "}
        {character.stats.pilotingAbility}
      </p>
      <p className="text-lg text-neutral-200">
        <span className="gradient-text">Diplomacy Rating:</span>{" "}
        {character.stats.diplomacyRating}
      </p>
      <p className="text-lg text-neutral-200">
        <span className="gradient-text">Weapons:</span>{" "}
        {character.weapons.join(", ")}
      </p>
      <p className="text-lg text-neutral-200">
        <span className="gradient-text">Vehicles:</span>{" "}
        {character.vehicles.join(", ")}
      </p>
      <p className="text-lg text-neutral-200">
        <span className="gradient-text">Is Jedi:</span>{" "}
        {character.isJedi ? "Yes" : "No"}
      </p>

      <p className="text-lg text-neutral-200">
        <span className="gradient-text">Apprentices:</span>{" "}
        {character.apprentices.join(", ")}
      </p>
      <p className="text-lg text-neutral-200">
        <span className="gradient-text">Master:</span> {character.master}
      </p>
      <p className="text-lg text-neutral-200">
        <span className="gradient-text">Notable Achievements:</span>{" "}
        {character.notableAchievements.join(", ")}
      </p>
    </div>
  );
}

export default CharacterDetail;
