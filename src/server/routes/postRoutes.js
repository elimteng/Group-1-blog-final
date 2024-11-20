const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//CRUD operations:
// Create a blog post
router.post("/", async (req, res) => {
  const { title, subtitle, content } = req.body;

  // Validate input fields
  if (!title || !subtitle || !content) {
    return res.status(400).json({ error: "All fields (Title, Subtitle, and Content) are required." });
  }

  try {
    const newPost = new Post({ title, subtitle, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});


// Create a new post
router.post("/", async (req, res) => {
  try {
    const { title, subtitle, content } = req.body;
    const newPost = new Post({ title, subtitle, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Update a blog post
router.put("/:id", async (req, res) => {
  const { title, subtitle, content } = req.body;

  // Validate input fields
  if (!title || !subtitle || !content) {
    return res.status(400).json({ error: "All fields (Title, Subtitle, and Content) are required." });
  }

  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, subtitle, content },
      { new: true } // Return the updated document
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
});


// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});


//For show blogs in Home Page:
// Fetch limited fields for Home.js
router.get("/limited", async (req, res) => {
  try {
    const blogs = await Post.find({}, "title subtitle createdAt"); // Fetch only specific fields
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Fetch full content for Blogs.js
router.get("/:id", async (req, res) => {
  try {
    const blog = await Post.findById(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the blog" });
  }
});


module.exports = router;
