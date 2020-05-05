const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// @route   GET api/auth
// @desc    Tests auth route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   Post api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/',
  [
    // username must be an email
    check('email', 'Please input an valid email').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials!' }] });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials!' }] });
        }
        // return jwt
        const payload = {
          user: {
            id: user.id,
          },
        };

        // Sign asynchronously watch in git
        // an hour valid
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            // console.log(token);
            res.json({ token });
          }
        );
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
