const express = require('express');
const mongoDB = require('./config/db');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');

const app = express();
mongoDB();

// Init middleware
app.use(express.json({ extended: false }));

// Use Routes
app.get('/', (req, res) => res.send('Api running'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
