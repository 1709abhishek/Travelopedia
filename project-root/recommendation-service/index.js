// recommendation-service/index.js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Import the Recommendation model
const Recommendation = require('./models/Recommendation');

// Routes
app.get('/', (req, res) => {
  res.send('Recommendation Service API');
});

// Example: Create a new recommendation
app.post('/api/recommendations', async (req, res) => {
  try {
    const newRecommendation = new Recommendation(req.body);
    const savedRecommendation = await newRecommendation.save();
    res.status(201).json(savedRecommendation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example: Get all recommendations
app.get('/api/recommendations', async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example: Update a recommendation
app.put('/api/recommendations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecommendation = await Recommendation.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedRecommendation) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }

    res.json(updatedRecommendation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example: Delete a recommendation
app.delete('/api/recommendations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecommendation = await Recommendation.findByIdAndDelete(id);

    if (!deletedRecommendation) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }

    res.status(204).send(); // No content to return
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Recommendation Service running on http://localhost:${PORT}`);
});
