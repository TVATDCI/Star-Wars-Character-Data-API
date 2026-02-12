import { useState } from 'react';
import { useUserProfileFetcher } from '../hooks/userProfileFetcher';
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
      <div className='text-center mt-20'>
        <p className='text-accent text-lg'>Loading profile...</p>
      </div>
    );

  return (
    <div className='bg-bg-card/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl max-w-2xl mx-auto mt-14 border border-border'>
      {/* Header */}
      <div className='text-center mb-6'>
        <h2 className='text-3xl text-error font-extrabold mb-2 font-dune'>
          User Profile
        </h2>
        <p className='text-text-muted text-sm'>
          Manage your personal information
        </p>
      </div>

      {/* Avatar Section */}
      <div className='flex justify-center mb-8'>
        <div className='relative'>
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt='Avatar'
              className='rounded-full w-32 h-32 object-cover border-4 border-accent/30 shadow-lg'
            />
          ) : (
            <div className='w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-sw-purple/20 border-4 border-accent/30 flex items-center justify-center'>
              <span className='text-5xl'>👤</span>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile Information Section */}
        <div className='bg-bg-card rounded-xl p-6 mb-6 border border-border'>
          <h3 className='text-xl text-accent font-bold mb-4 font-dune'>
            Profile Information
          </h3>

          <div className='space-y-4'>
            {/* Name Field */}
            <div>
              <label className='block text-left mb-2 text-sm font-semibold text-text-muted'>
                Display Name
              </label>
              <input
                name='name'
                className='p-3 w-full bg-bg-input border border-border rounded-lg text-text placeholder-text-subtle focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors'
                type='text'
                value={profile.name}
                onChange={handleChange}
                placeholder='Enter your name'
              />
            </div>

            {/* Bio Field */}
            <div>
              <label className='block text-left mb-2 text-sm font-semibold text-text-muted'>
                Bio
              </label>
              <textarea
                name='bio'
                className='p-3 w-full bg-bg-input border border-border rounded-lg text-text placeholder-text-subtle focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors resize-none'
                value={profile.bio}
                onChange={handleChange}
                rows='4'
                placeholder='Tell us about yourself...'
              />
            </div>

            {/* Location Field */}
            <div>
              <label className='block text-left mb-2 text-sm font-semibold text-text-muted'>
                Location
              </label>
              <input
                name='location'
                className='p-3 w-full bg-bg-input border border-border rounded-lg text-text placeholder-text-subtle focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors'
                type='text'
                value={profile.location}
                onChange={handleChange}
                placeholder='Where are you located?'
              />
            </div>

            {/* Avatar URL Field */}
            <div>
              <label className='block text-left mb-2 text-sm font-semibold text-text-muted'>
                Avatar URL
              </label>
              <input
                name='avatar'
                className='p-3 w-full bg-bg-input border border-border rounded-lg text-text placeholder-text-subtle focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors'
                type='text'
                value={profile.avatar}
                onChange={handleChange}
                placeholder='https://example.com/avatar.jpg'
              />
              <p className='text-text-subtle text-xs mt-1'>
                Provide a URL to your profile image
              </p>
            </div>
          </div>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className='mb-6 p-4 bg-success-subtle border border-success rounded-lg text-success text-center animate-fade-in'>
            {message}
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 justify-between'>
          <Button href='/' className='w-full sm:w-auto'>
            ← Return to Home
          </Button>
          <SpaceBtn
            type='submit'
            className='w-full sm:w-auto'
            white
            disabled={saving}
          >
            {saving ? 'Updating...' : 'Update Profile'}
          </SpaceBtn>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
