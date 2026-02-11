import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

  if (error) return <div className="text-red-500">{error}</div>;
  if (loading) return <div className="text-neutral-200 text-center mt-20">Loading...</div>;

  return (
    <div className="text-center bg-neutral-800/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl mt-14 w-full max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-2 justify-center sm:justify-between items-center mb-6">
        <Button href="/characters" className="font-bold">Back</Button>
        {userRole === 'admin' && (
          <SpaceBtn href={`/characters/edit/${id}`} className="font-bold text-neutral-300" white>Edit</SpaceBtn>
        )}
      </div>

      <h2 className="text-4xl text-red-500 font-extrabold mb-10">{character.name}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Height:</span> {character.height} cm
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Species:</span> {character.species}
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Home world:</span> {character.homeworld}
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Affiliation:</span> {character.affiliation}
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Force Rating:</span> {character.stats?.forceRating}
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Combat Skill:</span> {character.stats?.combatSkill}
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Piloting Ability:</span> {character.stats?.pilotingAbility}
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Diplomacy Rating:</span> {character.stats?.diplomacyRating}
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Is Jedi:</span> {character.isJedi ? 'Yes' : 'No'}
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Master:</span> {character.master || 'None'}
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Apprentices:</span> {character.apprentices?.join(', ') || 'None'}
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Weapons:</span> {character.weapons?.join(', ') || 'None'}
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Vehicles:</span> {character.vehicles?.join(', ') || 'None'}
        </p>
        <p className="text-pink-200/70 font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">Notable Achievements:</span> {character.notableAchievements?.join(', ') || 'None'}
        </p>
      </div>
    </div>
  );
}

export default CharacterDetail;
