const express = require('express');
const router = express.Router();

// @route   GET api/posts
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

module.exports = router;
