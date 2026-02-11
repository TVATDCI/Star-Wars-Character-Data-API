import { useState, useEffect } from 'react';
import { apiRequest } from './utils/api.js';
import { getUserRole } from './utils/auth';
import Button from '../components/buttons/Button';
import SpaceBtn from '../components/buttons/SpaceBtn.jsx';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const role = getUserRole() || 'user';
        setUserRole(role);
        const data = await apiRequest('GET', '/characters');
        setCharacters(data);
      } catch {
        setError('Failed to load characters.');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 5000);
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

  // Filter characters based on search query
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE);
  const paginatedCharacters = filteredCharacters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading)
    return <div className='text-neutral-200 text-center mt-20'>Loading...</div>;

  if (error) {
    return (
      <div className='text-red-500 text-center bg-neutral-300/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl mt-14 w-full max-w-6xl mx-auto'>
        <h2 className='text-2xl font-bold mb-4'>Error</h2>
        <p>{error}</p>
        <Button href='/' className='mt-4'>
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className='text-center bg-neutral-800/5 backdrop-blur-sm p-6 rounded-xl shadow-2xl mt-14 w-full max-w-6xl mx-auto'>
      <h1 className='text-2xl text-red-600 font-bold mb-4'>Characters</h1>
      {message && <p className='text-green-500 mb-4'>{message}</p>}

      {userRole === 'admin' && (
        <Button
          href='/characters/new'
          className='font-semibold mb-6 w-full sm:w-auto'
        >
          Add Character
        </Button>
      )}

      {/* Search Bar */}
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search characters...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full max-w-md px-4 py-2 bg-neutral-800/50 border border-neutral-600 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50'
        />
      </div>

      {/* Character Count */}
      <p className='text-neutral-400 text-sm mb-4'>
        Showing {paginatedCharacters.length} of {filteredCharacters.length}{' '}
        characters
        {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
      </p>

      {/* Card Grid Layout */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {paginatedCharacters.length === 0 ? (
          <p className='text-neutral-400 text-center col-span-full'>
            {searchQuery
              ? 'No characters match your search.'
              : 'No characters found.'}
          </p>
        ) : (
          paginatedCharacters.map((character) => (
            <div
              key={character._id}
              className='bg-neutral-800/30 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:bg-neutral-800/50 transition-all duration-300 border border-neutral-700/50 hover:border-yellow-500/30'
            >
              {/* Character Name */}
              <h3 className='text-xl font-bold text-yellow-400 mb-2 font-dune'>
                {character.name}
              </h3>

              {/* Character Info */}
              <div className='text-left text-sm text-neutral-300 space-y-1 mb-4'>
                <p>
                  <span className='text-blue-400'>Species:</span>{' '}
                  {character.species}
                </p>
                <p>
                  <span className='text-purple-400'>Affiliation:</span>{' '}
                  {character.affiliation}
                </p>
                <p>
                  <span className='text-green-400'>Force Rating:</span>{' '}
                  <span className='text-yellow-300'>
                    {'⭐'.repeat(
                      Math.floor((character.stats?.forceRating || 0) / 20)
                    )}
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-wrap gap-2 justify-center'>
                <SpaceBtn
                  href={`/characters/${character._id}`}
                  className='text-sm px-4 py-1'
                  white
                >
                  View
                </SpaceBtn>

                {userRole === 'admin' && (
                  <>
                    <Button
                      href={`/characters/edit/${character._id}`}
                      className='text-sm px-4 py-1'
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(character._id)}
                      className='text-sm px-4 py-1 text-red-400 hover:text-red-300'
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-4 mt-6'>
          <Button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Previous
          </Button>
          <span className='text-neutral-300'>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className={
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }
          >
            Next
          </Button>
        </div>
      )}

      <div className='mt-8 flex justify-center'>
        <Button href='/'>Return to Home</Button>
      </div>
    </div>
  );
}

export default Characters;
