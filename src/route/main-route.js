const express = require('express');
const router = express.Router();
const Route = require('./index');

router.use('/api', require(Route.AuthRoute));

router.use('/api/projects', require(Route.ProjectRoute));

router.use('/api/projects/:projectId/file', require(Route.FileRoute));

router.use('/api/projects/:projectId/jobs', require(Route.JobRoute));

module.exports = router;
