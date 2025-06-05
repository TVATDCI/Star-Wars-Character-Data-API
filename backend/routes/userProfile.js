router.patch("/", authenticateToken, async (req, res) => {
  console.log("Updating user profile:", req.body);
  try {
    const { name, bio, location, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (name !== undefined) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (avatar !== undefined) user.avatar = avatar;

    user.updatedAt = Date.now(); // Update timestamp
    await user.save();

    console.log("Updated user profile:", user);

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
