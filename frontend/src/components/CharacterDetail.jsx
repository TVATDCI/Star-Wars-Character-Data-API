import { useState, useEffect } from 'react';
import { getStoredToken, getUserRole } from './utils/auth';
import { apiRequest } from './utils/apiX.js';
import PropTypes from 'prop-types';
// import { jwtDecode } from "jwt-decode"; // Using the same logic as in Characters.jsx

import ButtonGradient from '../components/buttons/ButtonGradient';
import SpaceBtn from '../components/buttons/SpaceBtn.jsx';
import BtnNeonGradient from '../components/buttons/BtnNeonGradient.jsx';
import Button from '../components/buttons/Button';

function Detail({ label, value }) {
  return (
    <p className='text-pink-200/70 font-bold mb-2 '>
      <span className='text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 font-bold'>
        {label}:
      </span>{' '}
      {value}
    </p>
  );
}

Detail.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
};

function CharacterDetail({ characterId, onBack, onEdit }) {
  const [userRole, setUserRole] = useState('user');
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('User role in CharacterDetail:', userRole);
  // Fetch character details and user role on mount
  // using the same logic as in Characters.jsx
  useEffect(() => {
    const storedToken = getStoredToken()?.token;

    if (!storedToken) {
      setError('No authentication token found.');
      return;
    }
    try {
      setLoading(true);
    } catch (err) {
      console.error('Error setting loading state:', err.message);
      setError('Failed to set loading state. Please try again.');
      return;
    }
    // Role decoder is now moved to utils/auth.js
    const role = getUserRole();
    setUserRole(role); // Set user role based on token from utils/auth.js
    console.log('User role', role);

    // Fetch character details
    const fetchCharacterDetails = async () => {
      try {
        const data = await apiRequest(`/api/characters/${characterId}`);
        setCharacter(data);
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError('Failed to load character details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [characterId]); // Run only once on mount
  // Show loading state

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  if (loading) {
    return <div className='text-neutral-200'>Loading character...</div>;
  }

  return (
    <div className='text-center bg-neutral-800/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl mt-14 w-full max-w-6xl mx-auto'>
      {/* Header */}
      <p className='text-sm text-green-400 text-center italic mb-4'>
        {userRole === 'admin'
          ? 'As an admin, you can manage the characters below.'
          : 'As a user, you can view the available characters.'}
      </p>
      {/* Header row */}
      <div className='flex flex-wrap gap-2 justify-center sm:justify-between items-center mb-6'>
        <Button onClick={onBack} className='font-bold'>
          Back
        </Button>
        <ButtonGradient />
        <BtnNeonGradient />
        {userRole === 'admin' && (
          <SpaceBtn
            onClick={() => onEdit(characterId)}
            className='font-bold text-neutral-300'
          >
            Edit
          </SpaceBtn>
        )}
      </div>

      {/* Character name */}
      <h2 className='text-4xl text-red-500 font-extrabold mb-10 '>
        {character.name}
      </h2>

      {/* Stats grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
        <Detail label='Height' value={`${character.height} cm`} />
        <Detail label='Species' value={character.species} />
        <Detail label='Home world' value={character.homeworld} />
        <Detail label='Affiliation' value={character.affiliation} />
        <Detail label='Force Rating' value={character.stats.forceRating} />
        <Detail label='Combat Skill' value={character.stats.combatSkill} />
        <Detail
          label='Piloting Ability'
          value={character.stats.pilotingAbility}
        />
        <Detail
          label='Diplomacy Rating'
          value={character.stats.diplomacyRating}
        />
        <Detail label='Is 👾 Jedi' value={character.isJedi ? 'Yes' : 'No'} />
        <Detail label='Master' value={character.master || 'None'} />
        <Detail
          label='Apprentices'
          value={character.apprentices.join(', ') || 'None'}
        />
        <Detail
          label='Weapons'
          value={character.weapons.join(', ') || 'None'}
        />
        <Detail
          label='Vehicles'
          value={character.vehicles.join(', ') || 'None'}
        />
        <Detail
          label='Notable Achievements'
          value={character.notableAchievements.join(', ') || 'None'}
        />
      </div>
    </div>
  );
}
CharacterDetail.propTypes = {
  characterId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CharacterDetail;
