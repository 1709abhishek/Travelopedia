// config/db.js
const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb+srv://premchand2211:iR9rypC89EGZakvw@cluster0.01otr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    ;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connected to MongoDB at ${mongoose.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`MongoDB connection error: ${error.message}`.bgRed.white);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
