const express = require('express');
const router = express.Router();
const controller = require('../controller/index');
const verifyToken = require('../middleware/auth');

// All / routes are protected
router.post(
  '/', 
  verifyToken, 
  controller.ProjectController.createProject);

router.get(
  '/',
  verifyToken, 
  controller.ProjectController.getAllProjects);

router.get(
  '/:projectId', 
  verifyToken, 
  controller.ProjectController.getProjectById);

router.patch(
  '/:projectId', 
  verifyToken, 
  controller.ProjectController.updateProject);

router.delete(
  '/:projectId', 
  verifyToken, 
  controller.ProjectController.deleteProject);

module.exports = router;
