// additional user profile when it get updated from frontend!
import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";
import { validateUserProfile } from "../middleware/validateUserProfile.js";

const router = express.Router();
console.log("userProfile routes is loaded");

// GET /profile — fetch user profile
router.get("/", authenticateToken, async (req, res) => {
  console.log("Fetching user profile for:", req.user._id);
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      bio: user.bio,
      location: user.location,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /profile — update user profile fields!
// Change to PATCH method to allow partial updates
// Additional validation middleware to ensure correct data types (validateUserProfile)
router.patch("/", authenticateToken, validateUserProfile, async (req, res) => {
  console.log("Updating user profile:", req.body);
  try {
    const { name, bio, location, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Validate that at least one field is provided
    if (!name && !bio && !location && !avatar) {
      return res
        .status(400)
        .json({ error: "At least one field must be provided" });
    }

    // user profile validation moved to validateUserProfile middleware!

    // Conditionally update only if provided
    if (name !== undefined) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (avatar !== undefined) user.avatar = avatar;

    user.updatedAt = Date.now(); // update timestamp

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        bio: user.bio,
        location: user.location,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
