import { useState, useEffect } from 'react';
import { apiRequest } from './utils/api';
import { getStoredToken, getUserRole } from './utils/auth';
import PropTypes from 'prop-types';

import TextInput from './form/TextInput';
import NumberInput from './form/NumberInput';
import ArrayInput from './form/ArrayInput';
import CheckboxInput from './form/CheckboxInput';

import BtnNeonGradient from './buttons/BtnNeonGradient';
import SpaceBtn from './buttons/SpaceBtn';

function CharacterForm({ characterId, onSave, onCancel }) {
  const [userRole, setUserRole] = useState('user');
  const [character, setCharacter] = useState({
    name: '',
    height: 0,
    species: '',
    homeworld: '',
    affiliation: '',
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
    master: '',
    notableAchievements: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Default to false

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);

    if (!getStoredToken()?.token) {
      setError('No authentication token found. Please log in.');
      return;
    }

    if (characterId) {
      const fetchCharacterData = async () => {
        setLoading(true);
        try {
          const data = await apiRequest('GET', `/characters/${characterId}`);
          setCharacter((prev) => ({
            ...prev,
            ...data,
            stats: { ...prev.stats, ...data.stats },
          }));
        } catch (err) {
          setError('Failed to load character data.');
          console.error('Error fetching character:', err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCharacterData();
    }
  }, [characterId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const [field, subfield] = name.split('.');

    if (type === 'checkbox') {
      setCharacter((prev) => ({ ...prev, [name]: checked }));
    } else if (subfield) {
      // Handle nested state (e.g., stats.forceRating)
      setCharacter((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subfield]: type === 'number' ? parseFloat(value) || 0 : value,
        },
      }));
    } else if (
      ['weapons', 'vehicles', 'apprentices', 'notableAchievements'].includes(
        name
      )
    ) {
      // Handle array inputs
      setCharacter((prev) => ({
        ...prev,
        [name]: value.split(',').map((item) => item.trim()),
      }));
    } else {
      // Handle standard inputs
      setCharacter((prev) => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    const method = characterId ? 'PUT' : 'POST';
    const endpoint = characterId ? `/characters/${characterId}` : '/characters';

    try {
      const savedData = await apiRequest(method, endpoint, character);
      onSave(savedData);
    } catch (err) {
      setError(
        err.message || 'An unexpected error occurred. Please try again.'
      );
      console.error('Error saving character:', err);
    }
  };

  if (loading) {
    return <div className='text-center mt-14'>Loading character...</div>;
  }

  return (
    <div className='text-center bg-neutral-800/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl mt-14 w-full max-w-6xl mx-auto'>
      <form onSubmit={handleSubmit}>
        <h2 className='text-2xl text-red-600 font-bold mb-2'>
          {characterId ? 'Edit Character' : 'Add Character'}
        </h2>

        {error && (
          <div className='text-red-500 mb-4 p-2 bg-red-900/20 rounded'>
            {error}
          </div>
        )}

        <TextInput
          label='Name'
          name='name'
          value={character.name}
          onChange={handleChange}
          placeholder='Character Name'
        />
        <NumberInput
          label='Height'
          name='height'
          value={character.height}
          onChange={handleChange}
          placeholder='Height (cm)'
        />
        <TextInput
          label='Species'
          name='species'
          value={character.species}
          onChange={handleChange}
          placeholder='Species'
        />
        <TextInput
          label='Home World'
          name='homeworld'
          value={character.homeworld}
          onChange={handleChange}
          placeholder='Homeworld'
        />
        <TextInput
          label='Affiliation'
          name='affiliation'
          value={character.affiliation}
          onChange={handleChange}
          placeholder='Affiliation'
        />
        <NumberInput
          label='Force Rating'
          name='stats.forceRating'
          value={character.stats.forceRating}
          onChange={handleChange}
          placeholder='Force Rating'
        />
        <NumberInput
          label='Combat Skill'
          name='stats.combatSkill'
          value={character.stats.combatSkill}
          onChange={handleChange}
          placeholder='Combat Skill'
        />
        <NumberInput
          label='Piloting Ability'
          name='stats.pilotingAbility'
          value={character.stats.pilotingAbility}
          onChange={handleChange}
          placeholder='Piloting Ability'
        />
        <NumberInput
          label='Diplomacy Rating'
          name='stats.diplomacyRating'
          value={character.stats.diplomacyRating}
          onChange={handleChange}
          placeholder='Diplomacy Rating'
        />
        <ArrayInput
          label='Weapons'
          name='weapons'
          value={character.weapons}
          onChange={handleChange}
        />
        <ArrayInput
          label='Vehicles'
          name='vehicles'
          value={character.vehicles}
          onChange={handleChange}
        />
        <CheckboxInput
          label='Is 👾 Jedi ?'
          name='isJedi'
          checked={character.isJedi}
          onChange={handleChange}
          className='mb-2 p-2 w-full'
        />
        <ArrayInput
          label='Apprentices'
          name='apprentices'
          value={character.apprentices}
          onChange={handleChange}
        />
        <TextInput
          label='Master'
          name='master'
          value={character.master}
          onChange={handleChange}
          placeholder='Master'
        />
        <ArrayInput
          label='Notable Achievements'
          name='notableAchievements'
          value={character.notableAchievements}
          onChange={handleChange}
        />
        <div className='flex justify-between mt-4'>
          <SpaceBtn type='submit' className='text-white'>
            Save
          </SpaceBtn>
          <BtnNeonGradient />
          <SpaceBtn type='button' onClick={onCancel} className='text-white'>
            Cancel
          </SpaceBtn>
        </div>
      </form>
    </div>
  );
}
CharacterForm.propTypes = {
  characterId: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CharacterForm;
