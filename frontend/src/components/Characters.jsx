import { useState, useEffect } from 'react';
import { apiRequest } from './utils/api.js';
import { getUserRole } from './utils/auth';
import Button from '../components/buttons/Button';
import SpaceBtn from '../components/buttons/SpaceBtn.jsx';

function Characters() {
  console.log('Characters component rendering');
  
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Characters useEffect running');
    const fetchCharacters = async () => {
      console.log('Fetching characters...');
      try {
        setLoading(true);
        const role = getUserRole() || 'user';
        setUserRole(role);
        console.log('Making API request to /characters');
        const data = await apiRequest('GET', '/characters');
        console.log('Characters fetched:', data);
        setCharacters(data);
      } catch (err) {
        console.error('Error fetching characters:', err);
        setError('Failed to load characters.');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => { setMessage(''); setError(''); }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      if (userRole !== 'admin') {
        setError('Only admins can delete.');
        return;
      }
      await apiRequest('DELETE', `/characters/${id}`);
      setCharacters((prev) => prev.filter((char) => char._id !== id));
      setMessage('Character deleted.');
    } catch {
      setError('Delete failed.');
    }
  };

  if (loading) return <div className="text-neutral-200 text-center mt-20">Loading...</div>;

  if (error) {
    return (
      <div className="text-red-500 text-center bg-neutral-300/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl mt-14 w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
        <Button href="/" className="mt-4">Return to Home</Button>
      </div>
    );
  }

  return (
    <div className="text-center bg-neutral-800/5 backdrop-blur-sm p-6 rounded-xl shadow-2xl mt-14 w-full max-w-6xl mx-auto">
      <h1 className="text-2xl text-red-600 font-bold mb-4">Characters</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      
      {userRole === 'admin' && (
        <Link to="/characters/new"><Button className="font-semibold mb-4 w-full">Add Character</Button></Link>
      )}

      <div className="rounded-lg shadow-lg">
        {characters.length === 0 ? (
          <p className="text-neutral-400 text-center">No characters found.</p>
        ) : (
          <ul className="space-y-2">
            {characters.map((character) => (
              <li key={character._id} className="flex justify-between items-center bg-neutral-800/20 p-2 rounded-lg">
                <SpaceBtn href={`/characters/${character._id}`} className="text-lg font-semibold text-neutral-300">{character.name}</SpaceBtn>
                {userRole === 'admin' && (
                  <>
                    <Button href={`/characters/edit/${character._id}`} className="px-2 py-1 text-sm">Edit</Button>
                    <Button onClick={() => handleDelete(character._id)} className="px-2 py-1 text-sm text-red-400">Delete</Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button href="/">Return to Home</Button>
      </div>
    </div>
  );
}

export default Characters;
