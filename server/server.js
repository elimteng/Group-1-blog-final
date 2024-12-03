require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI;

// Check if MONGO_URI is defined
if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in your environment variables.");
  process.exit(1); // Exit the process with an error code
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI) // Deprecated options removed
  .then(() => console.log("MongoDB Atlas connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const postRoutes = require("./routes/postRoutes"); 
const authRoutes = require("./routes/authRoutes"); // New authentication routes
const guessbook = require("./routes/guessBookRoutes"); // Guest Book routes
const userRoutes = require("./routes/userRoutes"); // User Profile routes

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes); // Mount auth routes
app.use("/api/guestbook", guessbook); 
app.use("/api/profile", userRoutes); 

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
