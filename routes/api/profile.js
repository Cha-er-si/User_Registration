const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile
// @desc Test Route
// @access Public
//router.get('/', (req, res) => res.send('Profile Route'));

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'email', 'password']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('birthday', 'Birthday is required').not().isEmpty(),
      check('address', 'Address is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { birthday, address, status, bio, facebook, twitter, instagram } =
      req.body;

    // Build profile project
    const profileFields = {};
    profileFields.user = req.user.id;
    if (birthday) {
      profileFields.birthday = birthday;
    }
    if (address) {
      profileFields.address = address;
    }
    if (status) {
      profileFields.status = status;
    }
    if (bio) {
      profileFields.bio = bio;
    }

    // Build Social Media Object
    profileFields.social = {};
    if (facebook) {
      profileFields.social.facebook = facebook;
    }
    if (twitter) {
      profileFields.social.twitter = twitter;
    }
    if (instagram) {
      profileFields.social.instagram = instagram;
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/profile
// @desc Get all user profile
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'email']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'email']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
