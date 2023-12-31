const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Book', bookSchema);
