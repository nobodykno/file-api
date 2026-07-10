const express = require('express');
const router = express.Router({ mergeParams: true });
const fileController = require('../controller/file-controller');
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/uploader');

// Routes
router.post(
  '/',
  verifyToken,
  upload.array('files', 10), fileController.uploadFiles);

router.get(
  '/',
  verifyToken,
  fileController.getProjectFiles
);

router.delete(
  '/:fileId',
  verifyToken,
  fileController.deleteFile
);

module.exports = router;