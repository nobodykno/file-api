const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {


  const token = req.headers['authorization']


  if (!token) {
    return res.status(401).json({ message: 'No token provided!' })
  }

  const tokenWithoutBearer = token.replace('Bearer ', '')

  try {
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET)
    req.user = decoded    
    next()                
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token!' })
  }

}

module.exports = verifyToken