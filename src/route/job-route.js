const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controller/index');
const verifyToken = require('../middleware/auth');

// All job routes are protected
router.post('/', verifyToken, controller.JobController.createJob);
router.get('/', verifyToken, controller.JobController.getAllJobs);
router.get('/:jobId', verifyToken, controller.JobController.getJobStatus);
router.get('/:jobId/download', verifyToken, controller.JobController.downloadOutput);

module.exports = router;