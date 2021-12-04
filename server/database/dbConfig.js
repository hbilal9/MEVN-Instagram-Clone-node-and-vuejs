const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Database connected.')
});
db.on('error', (err) => {
    console.log({database_error: err})
});

module.exports = db;