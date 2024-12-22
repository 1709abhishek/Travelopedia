const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

connectDB();

app.use(express.json());

const Itinerary = require('./models/Itinerary');

// Routes
app.get('/', (req, res) => {
  res.send('Itinerary Service API');
});


app.post('/api/itineraries', async (req, res) => {
  try {
    const newItinerary = new Itinerary(req.body);
    const savedItinerary = await newItinerary.save();
    res.status(201).json(savedItinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/itineraries', async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/itineraries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Itinerary Service running on http://localhost:${PORT}`);
});
