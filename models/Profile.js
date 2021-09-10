const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  birthday: {
    type: Date,
    required: true,
    default: new Date(),
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
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
