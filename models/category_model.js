const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    description: String,
    photo: String,
    is_active: Boolean,
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;