// ✅ Correct — use router!
const express = require('express')
const router = express.Router()    

router.use('/api', require('../route/auth.route'))

module.exports = router