const mongoose = require('mongoose');
// import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'civilian']
  }
}, { timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
