const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();

// Middleware
app.use(cors());                    
app.use(express.json());           

// Routes
console.log('>>>>');
app.use('/v1', require('./route/main-route'));   // 👈 all auth routes

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'HotelBooking API is running!' });
});

module.exports = app;