
const express = require('express');
const router = express.Router();    

router.use('/api', require('./auth-route'));
router.use('/api/project', require('./auth-route'));
module.exports = router;