const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route GET api/users
// @desc Test Route
// @access Public
//router.get('/', (req, res) => res.send('User Route'));

// @route POST api/users
// @desc Register User
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if user exist
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      //Check Gravatar
      /*const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });*/

      user = new User({
        name,
        email,
        password,
      });

      //Encrypt Password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Return jsonwebtoken
      res.send('User Registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
