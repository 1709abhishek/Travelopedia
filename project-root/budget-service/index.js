// budget-service/index.js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3004;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Import the Budget model
const Budget = require('./models/Budget');

// Routes
app.get('/', (req, res) => {
  res.send('Budget Service API');
});

// Example: Create a new budget entry
app.post('/api/budgets', async (req, res) => {
  try {
    const newBudget = new Budget(req.body);
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example: Get all budgets
app.get('/api/budgets', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Budget Service running on http://localhost:${PORT}`);
});
