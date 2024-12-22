// models/Recommendation.js
const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
    customerId: mongoose.Schema.Types.ObjectId,
    place: String,
    reason: String,
    recommendedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
