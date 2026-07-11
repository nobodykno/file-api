const express = require('express');
const router = express.Router();
const controller = require('../controller/index');



router.post('/login', controller.AuthController.login);

module.exports = router;