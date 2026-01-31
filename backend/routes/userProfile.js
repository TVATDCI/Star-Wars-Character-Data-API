import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";
import { validateUserProfile } from "../middleware/validateUserProfile.js";

const router = express.Router();

// GET /profile — fetch user profile
router.get("/", authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json({
      name: user.name,
      email: user.email,
      bio: user.bio,
      location: user.location,
      avatar: user.avatar,
    });
  } catch (err) {
    next(err);
  }
});

// PUT /profile — update user profile fields!
// Change to PATCH method to allow partial updates
// Additional validation middleware to ensure correct data types (validateUserProfile)
router.patch("/", authenticateToken, validateUserProfile, async (req, res, next) => {
  try {
    const { name, bio, location, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Validate that at least one field is provided
    if (!name && !bio && !location && !avatar) {
      res.status(400);
      throw new Error("At least one field must be provided");
    }

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
    next(err);
  }
});

export default router;
