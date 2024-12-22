const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destinations: [{ type: String }],
    activities: [{ type: String }],
    photos: [{ url: { type: String, required: true }, description: String }], 
    hotels: [{ name: { type: String, required: true }, address: String }],
    spots: [{ name: { type: String, required: true }, description: String }] 
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
