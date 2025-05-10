import { useState, useEffect } from "react";

function Characters({ onSelectCharacter, returnToInfo, onAddCharacter }) {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    fetch("http://localhost:5000/api/characters", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }
        return response.json();
      })
      .then((data) => setCharacters(data))
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setError("Failed to fetch characters. Please log in again.");
      });
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    fetch(`http://localhost:5000/api/characters/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setCharacters((prevCharacters) =>
          prevCharacters.filter((character) => character._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting character:", error);
        setError("Failed to delete character. Please log in again.");
      });
  };

  if (error) {
    return (
      <div className="bg-neutral-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-xs">
        <h2 className="text-2xl text-red-600 font-bold mb-4">Error</h2>
        <p className="text-red-500">{error}</p>
        <button
          onClick={returnToInfo}
          className="text-blue-500 hover:text-cyan-400 transition-colors duration-800 mt-4"
        >
          Return to Info
        </button>
      </div>
    );
  }

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
              className="text-red-400 cursor-pointer hover:text-red-600"
              onClick={() => onSelectCharacter(character._id)}
            >
              {character.name}
            </span>
            <button
              onClick={() => handleDelete(character._id)}
              className="bg-red-500 text-neutral-200 px-1 rounded ml-2 hover:bg-red-700 transition-colors duration-800"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={returnToInfo}
        className="text-blue-500 hover:text-cyan-400 transition-colors duration-800 mt-2"
      >
        Return to Info
      </button>
    </div>
  );
}

export default Characters;

{
  /**

Characters.jsx Component did not handle the case where the token is missing or invalid. The component should check for the presence of the token and handle the case where the token is missing or invalid.

 The reason was the component was not properly handling the case where the token is missing or invalid. I need to ensure that the component checks for the presence of the token and handles the case where the token is missing or invalid.

Redirect to Login if Token is Missing


** Check for the presence of the token and handle the case where the token is missing or invalid.
**Update `App.jsx`**: Ensure that the token is removed from local storage upon logout and that the user is redirected to the login view if the token is missing or invalid.

**With these changes, the application should properly handle token validation and restrict access to protected routes if the token is missing or invalid.
   */
}
