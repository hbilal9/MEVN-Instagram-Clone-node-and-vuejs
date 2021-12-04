// packages
require('dotenv').config();
const express = require('express');

// modules
require('./database/dbConfig');
const router = require('./routes/api');

const app = express();

app.use(express.json());
app.use('/api', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running on http://127.0.0.1:${port}`)
})