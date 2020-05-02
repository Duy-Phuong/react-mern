const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route   GET api/users
// @desc    Tests users route
// @access  Public
router.post(
  '/test',
  [
    check('name', 'name is required').not().isEmpty(),
    // username must be an email
    check('email', 'Please input an valid email').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Please enter a password > 6').isLength({ min: 6 }),
  ],
  (req, res) => {
    // console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.json({ msg: 'Users Works' });
  }
);

module.exports = router;
