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

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await apiRequest("/profile");
        setProfile({
          name: data.name || "",
          bio: data.bio || "",
          location: data.location || "",
          avatar: data.avatar || "",
        });
      } catch (err) {
        setMessage(`Error fetching profile: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, setProfile, loading, message, setMessage };
};
