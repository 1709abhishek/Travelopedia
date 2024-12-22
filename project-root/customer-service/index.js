// index.js
const express = require('express');
const connectDB = require('./config/db');
const Customer = require('./models/Customer');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Example route to create a customer
app.post('/add-customer', async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
