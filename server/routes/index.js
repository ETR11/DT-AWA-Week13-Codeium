const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.post('/api/book/', async (req, res) => {
  try {
    const { author, name, pages } = req.body;

    const book = new Book({
      author,
      name,
      pages
    });

    await book.save();

    res.status(201).json({ message: 'Book saved to database' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving book to database' });
  }
});

module.exports = router;
