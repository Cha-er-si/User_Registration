const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  birthday: {
    type: Date,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  social: {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', profileSchema);
