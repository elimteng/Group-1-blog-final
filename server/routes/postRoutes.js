const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("./authMiddleware"); // Use middleware

// Create a new post (user-specific)
router.post("/", verifyToken, async (req, res) => {
  const { title, subtitle, content } = req.body;

  if (!title || !subtitle || !content) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newPost = new Post({
      title,
      subtitle,
      content,
      userId: req.user.id, // Link to the authenticated user
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Get all posts for the logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user.id }); // Fetch posts for the user
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});


// Get a single blog post by its _id
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params; // Extract blog ID from the route parameter

  try {
    const post = await Post.findOne({ _id: id, userId: req.user.id }); // Ensure the post belongs to the user
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching the post:", error);
    res.status(500).json({ error: "Failed to fetch the post" });
  }
});

// // Search posts by title or content
// router.get("/search", verifyToken, async (req, res) => {
//   const { q } = req.query; // Extract the search query from the URL

//   if (!q) {
//     return res.status(400).json({ error: "Search query is required." });
//   }

//   try {
//     const posts = await Post.find({
//       userId: req.user.id, // Ensure the user owns the posts
//       $or: [
//         { title: { $regex: q, $options: "i" } }, // Case-insensitive match for title
//         { content: { $regex: q, $options: "i" } }, // Case-insensitive match for content
//       ],
//     });

//     res.json(posts);
//   } catch (error) {
//     console.error("Error searching posts:", error);
//     res.status(500).json({ error: "Failed to search posts." });
//   }
// });



// Update a post (PUT /posts/:id)
router.put("/:id", verifyToken, async (req, res) => {
  const { title, subtitle, content } = req.body;

  if (!title || !subtitle || !content) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // Ensure user owns the post
      { title, subtitle, content },
      { new: true } // Return updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post." });
  }
});


router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id, // The ID from the request URL
      userId: req.user.id, // Ensure the user owns the post
    });

    if (!deletedPost) {
      // Return 404 if the post was not found
      return res.status(404).json({ error: "Post not found" });
    }

    // Return 204 No Content for successful deletion
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post." });
  }
});



module.exports = router;
