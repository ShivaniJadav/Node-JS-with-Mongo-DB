const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: String,
    email: String,
    password: {
        type: String,
        set: async password => await bcrypt.hashSync(password, 10)
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;