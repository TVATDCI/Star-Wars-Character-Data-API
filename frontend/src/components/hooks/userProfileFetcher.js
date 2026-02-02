import { useState, useEffect, useCallback } from 'react';
import { apiRequest } from '../utils/api.js';

export const useUserProfileFetcher = () => {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    location: '',
    avatar: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiRequest('GET', '/users/profile');
      console.log('Fetched profile data from backend:', data); // Debug log
      setProfile({
        name: data.name || '',
        bio: data.bio || '',
        location: data.location || '',
        avatar: data.avatar || '',
      });
    } catch (err) {
      console.error('PROFILE FETCH ERROR:', err);

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Unknown error';

      setMessage(`Error fetching profile: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('Fetching profile data on mount...'); // Debug log
    fetchProfile(); // Fetch profile data on mount
  }, [fetchProfile]);

  console.log('Fetched profile data:', profile);
  console.log('Updated profile state:', profile);
  console.log('Loading state:', loading);
  console.log('Message state:', message);

  return {
    profile,
    setProfile,
    loading,
    message,
    setMessage,
    refetch: fetchProfile,
  };
};
