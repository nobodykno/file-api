const jwt = require('jsonwebtoken');

const config = require('../config/database');

const User = require('../models/user-model');
require('dotenv').config();


const login = async (req, res) => {

  try {
    const { email, password } = req.body;


    //Database query to find the particular user with Id
    const user = await User.findOne({
      where: { email: email }
    });


    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }



    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  }
  catch (error) {
    res.status(201).json({
      message: 'Failed to login',
      error: error
    });
  }

};


module.exports = { login };