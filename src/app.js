const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();


app.use(cors());
app.use(express.json());


app.use('/v1', require('./route/main-route'));   // 👈 all auth routes


app.get('/', (req, res) => {
  res.json({ message: 'File API' });
});

module.exports = app;