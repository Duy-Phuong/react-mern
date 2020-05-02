const express = require('express');
const mongoDB = require('./config/db');

const app = express();

// Use Routes
app.use('/', (req, res) => res.send('Api running'));
mongoDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
