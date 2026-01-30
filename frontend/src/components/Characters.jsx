import { useState, useEffect } from "react";
import { apiRequest } from "./utils/api"; // Import apiRequest for API calls
import { getStoredToken, getUserRole } from "./utils/auth";

import Button from "../components/buttons/Button";
import ButtonGradient from "../components/buttons/ButtonGradient";
import SpaceBtn from "../components/buttons/SpaceBtn.jsx";
import BtnNeonGradient from "../components/buttons/BtnNeonGradient.jsx";
import PropTypes from "prop-types"; // Import PropTypes for props validation

function Characters({ onSelectCharacter, returnToInfo, onAddCharacter }) {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('user'); // default role to user
  console.log('User role in Characters:', userRole);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // replace with internal StoredToken set up from // utils/auth.js
  // Imported to api.js to apiRequest setup
  // const auth = getStoredToken();

  useEffect(() => {
    const fetchCharacters = async () => {
      const storedToken = getStoredToken()?.token;

      if (!storedToken) {
        setError('No authentication token found.');
        return;
      }

      try {
        setLoading(true);

        // Role decoder is now moved to utils/auth.js
        const role = getUserRole();
        setUserRole(role); // Set user role based on token from utils/auth.js
        console.log("User role", role);

        // apiRequest handle token internally
        const data = await apiRequest('/api/characters');
        setCharacters(data);
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError('Failed to load characters. Please try again.');
        setMessage(`Error fetching characters: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []); // Empty dependency array to run only once on mount to avoid infinite loop!

  // setting timeout for message
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 5000); // clear after 5 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [message, error]); // Run effect when message or error changes

  // Function to handle character deletion
  const handleDelete = async (id) => {
    try {
      const storedToken = getStoredToken()?.token;
      if (!storedToken) {
        setError('Authentication required. Please log in.');
        return;
      }

      await apiRequest(`/api/characters/${id}`, 'DELETE');

      setCharacters((prev) => prev.filter((char) => char._id !== id));
      setMessage('Character deleted successfully.');
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Could not delete character. Try again.');
    }
  };

  if (loading) {
    return <div className='text-neutral-200'>Loading characters...</div>;
  }

  if (error) {
    return (
      <div className='text-red-500 text-center bg-neutral-300/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl mt-14 w-full max-w-6xl mx-auto '>
        <h2 className='text-2xl font-bold mb-4'>Error</h2>
        <p>{error}</p>
        <ButtonGradient />
        <Button onClick={returnToInfo} className='mt-4 block text-center'>
          Return to Info
        </Button>
      </div>
    );
  }

  return (
    <div className='text-center bg-neutral-800/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl mt-14 w-full max-w-6xl mx-auto'>
      <h1 className='text-2xl text-red-600 font-bold mb-4'>Characters</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <p className='text-sm text-green-400 italic mb-4'>
        {userRole === 'admin'
          ? 'As an admin, you can manage the characters below.'
          : 'As a user, you can view the available characters.'}
      </p>

      {userRole === 'admin' && (
        <>
          <ButtonGradient />
          <Button
            onClick={onAddCharacter}
            className='font-semibold mb-4 w-full'
          >
            Add Character
          </Button>
        </>
      )}
      {/* Show characters list */}
      <div className='rounded-lg shadow-lg'>
        {characters.length === 0 ? (
          <p className='text-neutral-400 text-center'>No characters found.</p>
        ) : (
          <ul className='space-y-2'>
            {characters.map((character) => (
              <li
                key={character._id}
                className='flex justify-between items-center bg-neutral-800/20 p-2 rounded-lg shadow-md hover:bg-neutral-800/35 transition duration-300'
              >
                <SpaceBtn
                  className='text-lg font-semibold text-neutral-300'
                  onClick={() => onSelectCharacter(character._id)}
                >
                  {character.name}
                </SpaceBtn>
                <BtnNeonGradient />
                <ButtonGradient />
                {userRole === 'admin' && (
                  <Button
                    onClick={() => handleDelete(character._id)}
                    className='px-2 py-1'
                  >
                    Delete
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button onClick={returnToInfo} className='mt-6 block w-full text-center'>
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
