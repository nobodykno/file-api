const jwt = require('jsonwebtoken');

const config = require('../config/database');
const login = (req, res) => {

  try {
    const { email, password } = req.body;

    const users = require('../data/project.json');


    const user = users.find((u) => u.email === email);


    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }


    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.secret,
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
    });
  }

};


module.exports = { login };