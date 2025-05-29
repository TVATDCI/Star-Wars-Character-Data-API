import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user details on mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await apiRequest("/profile"); // auto-sends token
        setName(data.name || ""); // placeholder for now
      } catch (err) {
        setMessage("Failed to load profile.");
      }
    }

    fetchProfile();
  }, []);

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest("/profile", "PUT", { name });
      setMessage("Profile updated!");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Name:
          <input
            className="border p-2 w-full"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </label>
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default UserProfile;
