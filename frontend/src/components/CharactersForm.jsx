import { useState, useEffect } from "react";

function CharacterForm({ characterId, onSave, onCancel }) {
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
    if (characterId) {
      fetch(`http://localhost:5000/api/characters/${characterId}`)
        .then((response) => response.json())
        .then((data) => setCharacter(data))
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
    <div className="bg-neutral-900/10 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-xs">
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
          className="mb-2 p-2 w-full"
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
          onChange={(e) =>
            setCharacter((prevCharacter) => ({
              ...prevCharacter,
              stats: { ...prevCharacter.stats, forceRating: e.target.value },
            }))
          }
          placeholder="Force Rating"
          className="mb-2 p-2 w-full"
        />
        <input
          type="number"
          name="combatSkill"
          value={character.stats.combatSkill}
          onChange={(e) =>
            setCharacter((prevCharacter) => ({
              ...prevCharacter,
              stats: { ...prevCharacter.stats, combatSkill: e.target.value },
            }))
          }
          placeholder="Combat Skill"
          className="mb-2 p-2 w-full"
        />
        <input
          type="number"
          name="pilotingAbility"
          value={character.stats.pilotingAbility}
          onChange={(e) =>
            setCharacter((prevCharacter) => ({
              ...prevCharacter,
              stats: {
                ...prevCharacter.stats,
                pilotingAbility: e.target.value,
              },
            }))
          }
          placeholder="Piloting Ability"
          className="mb-2 p-2 w-full"
        />
        <input
          type="number"
          name="diplomacyRating"
          value={character.stats.diplomacyRating}
          onChange={(e) =>
            setCharacter((prevCharacter) => ({
              ...prevCharacter,
              stats: {
                ...prevCharacter.stats,
                diplomacyRating: e.target.value,
              },
            }))
          }
          placeholder="Diplomacy Rating"
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

export default CharacterForm;
