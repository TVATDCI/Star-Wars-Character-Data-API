import { useState, useEffect } from "react";

function Characters({ onSelectCharacter, returnToInfo }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/characters")
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  return (
    <div className="bg-neutral-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-xs">
      <h2 className="text-2xl text-red-600 font-bold mb-4">Characters</h2>
      <ul>
        {characters.map((character) => (
          <li
            key={character._id}
            className="mb-2 text-neutral-200 hover:text-red-500 transition-colors duration-800 cursor-pointer"
            onClick={() => onSelectCharacter(character._id)}
          >
            {character.name}
          </li>
        ))}
      </ul>
      <button onClick={returnToInfo} className="text-blue-500 mt-2">
        Return to Info
      </button>
    </div>
  );
}

export default Characters;
