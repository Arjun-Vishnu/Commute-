const mongoose = require('mongoose');

const customUserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
  },
  fileName: String,
});

const CustomUser = mongoose.model('CustomUser', customUserSchema);

module.exports = CustomUser;
