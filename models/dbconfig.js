const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_URL);
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log("Database connection successfull!");
})