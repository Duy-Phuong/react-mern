const express = require('express');

const app = express();

// Use Routes
app.use('/', (req, res) => res.send('Api running'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
