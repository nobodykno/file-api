const express = require('express');
const router = express.Router();
const projectController = require('../controller//.controller');
const verifyToken = require('../middleware/auth');

// All / routes are protected
router.post('/', verifyToken, projectController.createProject);
router.get('/', verifyToken, projectController.getAllProjects);
router.get('/:id', verifyToken, projectController.getProjectById);
router.patch('/:id', verifyToken, projectController.updateProject);
router.delete('/:id', verifyToken, projectController.deleteProject);

module.exports = router;