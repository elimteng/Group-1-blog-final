const express = require("express");
const User = require("../models/User");
const verifyToken = require("../routes/authMiddleware"); // Import middleware
const router = express.Router();

// GET /profile - Fetch user profile
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user); // Send the user profile

  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
