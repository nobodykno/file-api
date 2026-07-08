
const express = require('express')
const router = express.Router()    

router.use('/api', require('../route/auth.route'))
router.use('/api/project', require('../route/auth.route'))
module.exports = router