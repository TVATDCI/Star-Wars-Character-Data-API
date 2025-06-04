// additional user profile when it get updated from frontend!
import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const router = express.Router();
console.log("userProfile routes is loaded");

// GET /profile — fetch user profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = req.user; // set by authMiddleware
    res.json({ name: user.name || "", email: user.email });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /profile — update user name
router.put("/", authenticateToken, async (req, res) => {
  console.log("Updating user profile:", req.body);
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ error: "Name is required and must be a string" });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = name;
    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
