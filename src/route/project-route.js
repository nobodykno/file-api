const express = require('express');
const router = express.Router();
const projectController = require('../controller/project-controller');
const verifyToken = require('../middleware/auth');

// All / routes are protected
router.post(
  '/', 
  verifyToken, 
  projectController.createProject);

router.get(
  '/',
  verifyToken, 
  projectController.getAllProjects);

router.get(
  '/:projectId', 
  verifyToken, 
  projectController.getProjectById);

router.patch(
  '/:projectId', 
  verifyToken, 
  projectController.updateProject);

router.delete(
  '/:projectId', 
  verifyToken, 
  projectController.deleteProject);

module.exports = router;
