const express = require('express')
const router = express.Router()
const authController = require('../controller/auth.controller')

// Public routes

router.post('/login', authController.login)

module.exports = router