const express = require('express');
const router = express.Router();

router.use('/api', require('./auth-route'));

router.use('/api/project', require('./project-route'));

router.use('/api/project/:projectId/file', require('./file-route'));

module.exports = router;
