const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controller/index');
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/uploader');

// Routes
router.post(
  '/',
  verifyToken,
  upload.array('files', 10), controller.FileController.uploadFiles);

router.get(
  '/',
  verifyToken,
  controller.FileController.getProjectFiles
);

router.delete(
  '/:fileId',
  verifyToken,
  controller.FileController.deleteFile
);

module.exports = router;