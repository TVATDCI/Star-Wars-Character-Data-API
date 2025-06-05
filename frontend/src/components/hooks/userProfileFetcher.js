import { useState, useEffect } from "react";
import { apiRequest } from "../utils/api";

export const useUserProfileFetcher = () => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    location: "",
    avatar: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/profile");
      console.log("Fetched profile data from backend:", data); // Debug log
      setProfile({
        name: data.name || "",
        bio: data.bio || "",
        location: data.location || "",
        avatar: data.avatar || "",
      });
      console.log("Profile state updated:", profile); // Debug log
    } catch (err) {
      setMessage(`Error fetching profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching profile data on mount..."); // Debug log
    fetchProfile(); // Fetch profile data on mount
  }, []);

  console.log("Fetched profile data:", profile);
  console.log("Updated profile state:", profile);
  console.log("Loading state:", loading);
  console.log("Message state:", message);

  return {
    profile,
    setProfile,
    loading,
    message,
    setMessage,
    refetch: fetchProfile,
  };
};
