import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode to decode the JWT token
import Button from "../components/buttons/Button";
import ButtonGradient from "../components/buttons/ButtonGradient";
import SpaceBtn from "../components/buttons/SpaceBtn.jsx";
import BtnNeonGradient from "../components/buttons/BtnNeonGradient.jsx";
import PropTypes from "prop-types"; // Import PropTypes for props validation

function Characters({ onSelectCharacter, returnToInfo, onAddCharacter }) {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("user"); // default role to user
  console.log("User role in Characters:", userRole);
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
      <div className="bg-neutral-800/10 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-xs">
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
      <div className="bg-neutral-800/10 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-xs">
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
    <div className="text-center bg-neutral-800/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl mt-14 w-full max-w-6xl mx-auto">
      <h1 className="text-2xl text-red-600 font-bold mb-4">Characters</h1>

      <p className="text-sm text-green-400 italic mb-4">
        {userRole === "admin"
          ? "As an admin, you can manage the characters below."
          : "As a user, you can view the available characters."}
      </p>

      {userRole === "admin" && (
        <>
          <ButtonGradient />
          <Button
            onClick={onAddCharacter}
            className="font-semibold mb-4 w-full"
          >
            Add Character
          </Button>
        </>
      )}
      {/* Show characters list */}
      <div className="rounded-lg shadow-lg">
        {characters.length === 0 ? (
          <p className="text-neutral-400 text-center">No characters found.</p>
        ) : (
          <ul className="space-y-2">
            {characters.map((character) => (
              <li
                key={character._id}
                className="flex justify-between items-center bg-neutral-800/20 p-2 rounded-lg shadow-md hover:bg-neutral-800/35 transition duration-300"
              >
                <SpaceBtn
                  className="text-lg font-semibold text-neutral-300"
                  onClick={() => onSelectCharacter(character._id)}
                >
                  {character.name}
                </SpaceBtn>
                <BtnNeonGradient />
                <ButtonGradient />
                {userRole === "admin" && (
                  <Button
                    onClick={() => handleDelete(character._id)}
                    className="px-2 py-1"
                  >
                    Delete
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button onClick={returnToInfo} className="mt-6 block w-full text-center">
        Return to Info
      </Button>
    </div>
  );
}
Characters.propTypes = {
  onSelectCharacter: PropTypes.func.isRequired,
  returnToInfo: PropTypes.func.isRequired,
  onAddCharacter: PropTypes.func.isRequired,
};

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
