import { useState } from 'react';
import { useUserProfileFetcher } from '../hooks/userProfileFetcher';
import PropTypes from 'prop-types';
import { apiRequest } from '../utils/api';

import SpaceBtn from '../buttons/SpaceBtn';
import BtnNeoGradient from '../buttons/BtnNeonGradient';
import Button from '../buttons/Button';
import ButtonGradient from '../buttons/ButtonGradient';

const UserProfile = ({ returnToInfo, onUpdate }) => {
  const { profile, setProfile, loading, message, setMessage, refetch } =
    useUserProfileFetcher();
  const [saving, setSaving] = useState(false);

  const { name, bio, location, avatar } = profile;

  const isUnchanged =
    name === '' && bio === '' && location === '' && avatar === '';

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        bio: bio.trim(),
        location: location.trim(),
        avatar: avatar.trim(),
      };
      await apiRequest('PATCH', '/users/profile', payload); // Update profile on the backend
      setProfile(payload); // Update local state
      setMessage('Profile updated!');
      console.log('Profile updated successfully:', name);

      await refetch(); // Refetch the profile data to ensure it's up-to-date

      if (onUpdate) {
        onUpdate({
          name: payload.name,
          bio: payload.bio,
          location: payload.location,
          avatar: payload.avatar,
        });
        console.log('onUpdate callback called with:', payload);
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className='text-yellow-500'>Loading profile...</p>;
  }

  return (
    <div className='bg-neutral-800/20 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs'>
      <h3 className='text-2xl text-red-600 p-2 font-bold mb-1 text-center'>
        {name || 'User Profile'}
      </h3>
      <form onSubmit={handleSubmit}>
        {avatar && (
          <div className='mb-1 flex justify-center'>
            <img
              src={avatar}
              alt='Avatar Preview'
              className='rounded-full w-24 h-24 object-cover'
            />
          </div>
        )}
        <label className='block mb-2'>
          Name:
          <input
            name='name'
            className='border p-2 w-full'
            type='text'
            value={name}
            onChange={handleChange}
            disabled={loading}
            placeholder='Enter your user name'
          />
        </label>

        <label className='block mb-2'>
          Bio:
          <textarea
            name='bio'
            className='border p-2 w-full'
            value={bio}
            onChange={handleChange}
            disabled={loading}
            rows='3'
            placeholder='Tell us about yourself'
          />
        </label>

        <label className='block mb-2'>
          Location:
          <input
            name='location'
            className='border p-2 w-full'
            type='text'
            value={location}
            onChange={handleChange}
            disabled={loading}
            placeholder='Where are you located?'
          />
        </label>

        <label className='block mb-2'>
          Avatar URL:
          <input
            name='avatar'
            className='border p-2 w-full'
            type='text'
            value={avatar}
            onChange={handleChange}
            disabled={loading}
            placeholder='Enter your avatar image URL'
          />
        </label>

        <BtnNeoGradient />
        <SpaceBtn
          type='submit'
          onClick={handleSubmit}
          className='mt-4 text-center block text-red-700 hover:text-red-400'
          disabled={loading || saving || isUnchanged}
        >
          {saving || loading ? 'Updating...' : 'Update Profile'}
        </SpaceBtn>
      </form>
      {loading && <p className='mt-2 text-yellow-500'>Loading...</p>}
      {message && <p className='mt-4 text-green-600'>{message}</p>}
      <ButtonGradient />
      <Button onClick={returnToInfo} className='block mt-4 text-center'>
        Return to Info
      </Button>
    </div>
  );
};

UserProfile.propTypes = {
  returnToInfo: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UserProfile;
