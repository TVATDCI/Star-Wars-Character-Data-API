import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode to decode the JWT token

function Characters({ onSelectCharacter, returnToInfo, onAddCharacter }) {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("user"); // default role to user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    // Decode the token to get the user role
    let endpoint = "http://localhost:5000/api/characters"; // default user/public endpoint

    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role || "user"; // if the role is not present, default to user
      setUserRole(role); // Otherwise set the user role in state

      if (role === "admin") {
        endpoint = "http://localhost:5000/api/characters"; // set to admin endpoint
      }
    } catch (error) {
      console.error("Error Invalid token:", error);
      setError("Invalid token. Please log in again.");
      return;
    }
    // Fetch characters based on the role
    fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch characters");
        return response.json();
      })
      .then((data) => setCharacters(data))
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setError("Failed to fetch characters. Please log in again.");
      })
      .finally(() => setLoading(false));
    // Cleanup function to reset loading state
  }, []); // Empty dependency array to avoid re-fetching on every render

  // Show loading state
  if (loading) {
    return <div className="text-neutral-200">Loading... Characters</div>;
  }

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

  // Handle character deletion
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
    <div className="bg-neutral-800/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-sm w-full">
      <h2 className="text-2xl text-red-600 font-bold mb-4">Characters</h2>

      <p className="text-sm text-neutral-300 italic mb-4">
        {userRole === "admin"
          ? "As an admin, you can manage the characters below."
          : "As a user, you can view the available characters."}
      </p>

      {userRole === "admin" && (
        <button
          onClick={onAddCharacter}
          className="bg-green-700 text-white font-semibold py-1 px-3 rounded hover:bg-green-900 transition duration-300 mb-4 w-full"
        >
          + Add Character
        </button>
      )}

      {characters.length === 0 ? (
        <p className="text-neutral-400 text-center">No characters found.</p>
      ) : (
        <ul className="space-y-2">
          {characters.map((character) => (
            <li
              key={character._id}
              className="flex justify-between items-center text-neutral-200 hover:text-red-500 transition duration-300"
            >
              <span
                className="cursor-pointer hover:text-red-600"
                onClick={() => onSelectCharacter(character._id)}
              >
                {character.name}
              </span>

              {userRole === "admin" && (
                <button
                  onClick={() => handleDelete(character._id)}
                  className="bg-red-500 text-white text-sm px-2 py-0.5 rounded hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={returnToInfo}
        className="text-blue-500 hover:text-cyan-400 mt-6 block w-full text-center transition duration-300"
      >
        ⬅ Return to Info
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
