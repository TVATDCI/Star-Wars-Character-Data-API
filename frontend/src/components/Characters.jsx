import { useState, useEffect } from "react";

function Characters({ onSelectCharacter, returnToInfo, onAddCharacter }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/characters")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }
        return response.json(); // Ensure response.json() is returned
      })
      .then((data) => setCharacters(data))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/characters/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setCharacters((prevCharacters) =>
          prevCharacters.filter((character) => character._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting character:", error));
  };

  return (
    <div className="bg-neutral-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-xs">
      <h2 className="text-2xl text-red-600 font-bold mb-4">Characters</h2>
      <button
        onClick={onAddCharacter}
        className="text-white mb-4 bg-green-700 rounded cursor-pointer px-1 hover:bg-green-900 transition-colors duration-800"
      >
        Add Character
      </button>
      <ul>
        {characters.map((character) => (
          <li
            key={character._id}
            className="mb-2 text-neutral-200 hover:text-red-500 transition-colors duration-800 cursor-pointer flex justify-between"
          >
            <span
              className="text-red-400 cursor-pointer hover:text-red-600 "
              onClick={() => onSelectCharacter(character._id)}
            >
              {character.name}
            </span>
            <button
              onClick={() => handleDelete(character._id)}
              className="bg-red-500 text-neutral-200 px-1 rounded ml-2 hover:bg-red-700  transition-colors duration-800"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={returnToInfo}
        className=" text-blue-500 hover:text-cyan-400 transition-colors duration-800  mt-2"
      >
        Return to Info
      </button>
    </div>
  );
}

export default Characters;
