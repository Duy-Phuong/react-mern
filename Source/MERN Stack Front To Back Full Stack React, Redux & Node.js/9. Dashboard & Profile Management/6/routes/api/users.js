const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Load User model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Tests users route
// @access  Public
router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    // username must be an email
    check('email', 'Please input an valid email').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Please enter a password > 6').isLength({ min: 6 }),
  ],
  async (req, res) => {
    // console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists!' }] });
      } else {
        // Get user gravatar
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm', // Default
        });

        const user = new User({
          name,
          email,
          avatar,
          password,
        });

        // encrypt passwword
        const salt = await bcrypt.genSalt(10);
        // recommend is 10
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // return jwt
        // res.json({ msg: 'Users registered' });
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
