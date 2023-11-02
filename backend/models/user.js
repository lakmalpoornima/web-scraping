const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // You can add more fields for user data as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;