const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
});

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;
