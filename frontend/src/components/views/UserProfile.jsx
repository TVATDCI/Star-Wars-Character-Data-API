import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { apiRequest } from "../utils/api";

import Button from "../buttons/Button";
import ButtonGradient from "../buttons/ButtonGradient";

const UserProfile = ({ returnToInfo }) => {
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
    <div className="bg-neutral-800/20 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
      <h2 className="text-2xl text-red-600 p-2 font-bold mb-2">
        Edit Your Profile
      </h2>
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
      <ButtonGradient />
      <Button onClick={returnToInfo} className="block mt-4 text-center">
        Return to Info
      </Button>
    </div>
  );
};
UserProfile.propTypes = {
  returnToInfo: PropTypes.func.isRequired,
};

export default UserProfile;
