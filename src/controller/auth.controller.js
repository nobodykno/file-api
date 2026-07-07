const jwt = require('jsonwebtoken')

const config = require ('../config/database')
const login = (req, res) => {

    console.log(req)
    const { email, password } = req.body
  
    // Step 1 — Get all users directly
    const users = require('../data/users.json')
  
    // Step 2 — Find user by email
    const user = users.find((u) => u.email === email)
  
    // Step 3 — Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password!' })
    }
  
    // Step 4 — Check password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password!' })
    }
  
    console.log('Found user:', user)
    // { id: 1, name: 'Paramjit', email: 'test@gmail.com', password: '1234' }
  
    // Step 5 — Create token and send response
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.secret,
      { expiresIn: '24h' }
    )
  
    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  }

  module.exports = { login }