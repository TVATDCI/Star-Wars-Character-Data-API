import { useState } from 'react';
import { useUserProfileFetcher } from '../hooks/userProfileFetcher';
import { Link } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import SpaceBtn from '../buttons/SpaceBtn';
import Button from '../buttons/Button';

const UserProfile = () => {
  const { profile, setProfile, loading, message, setMessage } =
    useUserProfileFetcher();
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: profile.name.trim(),
        bio: profile.bio.trim(),
        location: profile.location.trim(),
        avatar: profile.avatar.trim(),
      };
      await apiRequest('PATCH', '/users/profile', payload);
      setMessage('Profile updated!');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <p className='text-yellow-500 text-center mt-20'>Loading profile...</p>
    );

  return (
    <div className='bg-neutral-800/20 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs mx-auto mt-14'>
      <h3 className='text-2xl text-red-600 p-2 font-bold mb-1 text-center'>
        {profile.name || 'User Profile'}
      </h3>

      <form onSubmit={handleSubmit}>
        {profile.avatar && (
          <div className='mb-1 flex justify-center'>
            <img
              src={profile.avatar}
              alt='Avatar'
              className='rounded-full w-24 h-24 object-cover'
            />
          </div>
        )}

        <label className='block mb-2'>
          Name:
          <input
            name='name'
            className='border p-2 w-full bg-neutral-700/50 border-neutral-600 rounded text-white'
            type='text'
            value={profile.name}
            onChange={handleChange}
            placeholder='Enter your name'
          />
        </label>

        <label className='block mb-2'>
          Bio:
          <textarea
            name='bio'
            className='border p-2 w-full bg-neutral-700/50 border-neutral-600 rounded text-white'
            value={profile.bio}
            onChange={handleChange}
            rows='3'
            placeholder='Tell us about yourself'
          />
        </label>

        <label className='block mb-2'>
          Location:
          <input
            name='location'
            className='border p-2 w-full bg-neutral-700/50 border-neutral-600 rounded text-white'
            type='text'
            value={profile.location}
            onChange={handleChange}
            placeholder='Where are you located?'
          />
        </label>

        <label className='block mb-2'>
          Avatar URL:
          <input
            name='avatar'
            className='border p-2 w-full bg-neutral-700/50 border-neutral-600 rounded text-white'
            type='text'
            value={profile.avatar}
            onChange={handleChange}
            placeholder='Enter avatar image URL'
          />
        </label>

        <SpaceBtn
          type='submit'
          className='w-full text-center block text-red-700 hover:text-red-400 mb-2'
          disabled={saving}
        >
          {saving ? 'Updating...' : 'Update Profile'}
        </SpaceBtn>
      </form>

      {message && <p className='mt-4 text-green-600 text-center'>{message}</p>}
      <Button href='/' className='block w-full text-center mt-4'>
        Return to Home
      </Button>
    </div>
  );
};

export default UserProfile;
