import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserRole } from './utils/auth';
import { apiRequest } from './utils/api.js';
import Button from '../components/buttons/Button';
import SpaceBtn from '../components/buttons/SpaceBtn.jsx';

function CharacterDetail() {
  const { id } = useParams();
  const [userRole, setUserRole] = useState('user');
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        setLoading(true);
        const role = getUserRole();
        setUserRole(role);
        const data = await apiRequest('GET', `/characters/${id}`);
        setCharacter(data);
      } catch {
        setError('Failed to load character.');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacterDetails();
  }, [id]);

  if (error) return <div className='text-red-500'>{error}</div>;
  if (loading)
    return <div className='text-neutral-200 text-center mt-20'>Loading...</div>;

  // Helper component for stat bars
  const StatBar = ({ label, value, color }) => {
    const percentage = Math.min(100, Math.max(0, value || 0));
    return (
      <div className='mb-3'>
        <div className='flex justify-between text-sm mb-1'>
          <span className='text-neutral-300'>{label}</span>
          <span className='text-yellow-400'>{percentage}%</span>
        </div>
        <div className='w-full bg-neutral-700/50 rounded-full h-3'>
          <div
            className={`h-3 rounded-full transition-all duration-500 ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  StatBar.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number,
    color: PropTypes.string.isRequired,
  };

  return (
    <div className='text-center bg-neutral-800/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl mt-14 w-full max-w-4xl mx-auto'>
      {/* Back Button */}
      <div className='flex justify-start mb-6'>
        <Button href='/characters' className='font-bold'>
          ← Back to Characters
        </Button>
      </div>

      {/* Header Section */}
      <div className='flex flex-col md:flex-row gap-6 mb-8'>
        {/* Avatar Placeholder */}
        <div className='flex-shrink-0'>
          <div className='w-32 h-32 md:w-40 md:h-40 mx-auto bg-gradient-to-br from-yellow-500/20 to-purple-600/20 rounded-full flex items-center justify-center border-2 border-yellow-500/30'>
            <span className='text-4xl md:text-5xl'>👤</span>
          </div>
        </div>

        {/* Character Info */}
        <div className='flex-grow text-left'>
          <h2 className='text-4xl text-red-500 font-extrabold mb-2 font-dune'>
            {character.name}
          </h2>
          <div className='space-y-1 text-neutral-300'>
            <p>
              <span className='text-blue-400'>Species:</span>{' '}
              {character.species}
            </p>
            <p>
              <span className='text-purple-400'>Affiliation:</span>{' '}
              {character.affiliation}
            </p>
            <p>
              <span className='text-green-400'>Homeworld:</span>{' '}
              {character.homeworld}
            </p>
            <p>
              <span className='text-yellow-400'>Height:</span>{' '}
              {character.height} cm
            </p>
          </div>

          {/* Admin Actions */}
          {userRole === 'admin' && (
            <div className='flex gap-2 mt-4'>
              <SpaceBtn
                href={`/characters/edit/${id}`}
                className='font-bold text-neutral-300'
                white
              >
                Edit Character
              </SpaceBtn>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className='bg-neutral-800/30 rounded-xl p-6 mb-6'>
        <h3 className='text-xl text-yellow-400 font-bold mb-4 font-dune'>
          Character Stats
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <StatBar
            label='Force Rating'
            value={character.stats?.forceRating}
            color='bg-gradient-to-r from-blue-500 to-purple-500'
          />
          <StatBar
            label='Combat Skill'
            value={character.stats?.combatSkill}
            color='bg-gradient-to-r from-red-500 to-orange-500'
          />
          <StatBar
            label='Piloting Ability'
            value={character.stats?.pilotingAbility}
            color='bg-gradient-to-r from-green-500 to-teal-500'
          />
          <StatBar
            label='Diplomacy Rating'
            value={character.stats?.diplomacyRating}
            color='bg-gradient-to-r from-yellow-500 to-amber-500'
          />
        </div>
      </div>

      {/* Details Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-left'>
        {/* Left Column */}
        <div className='bg-neutral-800/30 rounded-xl p-4'>
          <h3 className='text-lg text-yellow-400 font-bold mb-3 font-dune'>
            Jedi Information
          </h3>
          <div className='space-y-2 text-neutral-300'>
            <p>
              <span className='text-blue-400'>Is Jedi:</span>{' '}
              {character.isJedi ? 'Yes ✅' : 'No ❌'}
            </p>
            <p>
              <span className='text-purple-400'>Master:</span>{' '}
              {character.master || 'None'}
            </p>
            <p>
              <span className='text-green-400'>Apprentices:</span>{' '}
              {character.apprentices?.join(', ') || 'None'}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className='bg-neutral-800/30 rounded-xl p-4'>
          <h3 className='text-lg text-yellow-400 font-bold mb-3 font-dune'>
            Equipment & Achievements
          </h3>
          <div className='space-y-2 text-neutral-300'>
            <p>
              <span className='text-red-400'>Weapons:</span>{' '}
              {character.weapons?.join(', ') || 'None'}
            </p>
            <p>
              <span className='text-cyan-400'>Vehicles:</span>{' '}
              {character.vehicles?.join(', ') || 'None'}
            </p>
            <p>
              <span className='text-yellow-400'>Notable Achievements:</span>
            </p>
            <ul className='list-disc list-inside text-sm text-neutral-400'>
              {character.notableAchievements?.length > 0 ? (
                character.notableAchievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))
              ) : (
                <li>None recorded</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
