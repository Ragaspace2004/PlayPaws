// Assuming you have already set up Mongoose and imported necessary packages
const mongoose = require('mongoose');

// Define the schema for the user
const userSchema = new mongoose.Schema({
  custName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure uniqueness of email
  },
  custPassword: {
    type: String,
    required: true
  }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
