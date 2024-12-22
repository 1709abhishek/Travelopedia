// models/Customer.js
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    age: Number,
    location: String,
    wishlist: [String],
    placesVisited: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', CustomerSchema);
