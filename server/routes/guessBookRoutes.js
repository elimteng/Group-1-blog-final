const express = require('express');
const GuestbookEntry = require('../models/Guessbook'); // Import the GuestbookEntry model
const router = express.Router();

// GET all guestbook entries
router.get('/', async (req, res) => {
  try {
    const entries = await GuestbookEntry.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(entries);
  } catch (error) {
    console.error('Error fetching guestbook entries:', error);
    res.status(500).send('Server error');
  }
});

// POST a new guestbook entry
router.post('/', async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  try {
    const newEntry = new GuestbookEntry({ content });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error saving guestbook entry:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
