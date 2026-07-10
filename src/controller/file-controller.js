

const File = require('../models/file-model');
const fs = require('fs');
const Project = require('../models/project-model');

/**
 * 
 * @param multiplefiles 
 * 
 *  
 */
const uploadFiles = async (req, res) => {

  try {
    const projectId = +req.params.projectId;



    if (!projectId) {
      return res.status(404).json({ message: 'Project not found!' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded!' });
    }


    const newFiles = req.files.map((file) => ({
      project_id: projectId,
      name: file.originalname,
      file_name: file.filename,
      size: file.size,
      mime_type: file.mimetype,
      path: file.path,
      uploadedAt: new Date().toLocaleString()
    }));

    // Query to create bulk files
    await File.bulkCreate(newFiles);

    const fileCount = await File.count({
      where: {
        project_id: projectId
      }
    });


    // Query to update project details
    await Project.update(
      {
        files_count: fileCount
      },
      {
        where: {
          id: projectId
        }
      }
    );



    return res.status(201).json({
      message: 'Files uploaded successfully!'
    });



  } catch (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large! Max 10MB allowed.' });
    }

    return res.status(500).json({ message: 'Upload failed!', error: err });
  }

};

/** 
 *  
 * @param projectId
 * 
 * Get all project files
 * 
 */
const getProjectFiles = async (req, res) => {

  try {

    const projectId = parseInt(req.params.projectId);


    if (!projectId) {
      return res.status(404).json({ message: 'Project not found!' });
    }

    // Query to find all files belongs to the project
    const projectFiles = await File.findAll({
      where: {
        project_id: projectId
      }
    });

    return res.status(200).json({
      message: 'Files fetched successfully!',
      count: projectFiles.length,
      result: projectFiles
    });

  } catch (err) {
    return res.status(500).json({ message: 'Server error!' });
  }
};

/** 
 *  
 * @param projectId
 * @param fileId
 * 
 * delete a file
 * 
 */
const deleteFile = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);
    const fileId = Number(req.params.fileId);



    //Query to check file exist or not

    const file = await File.findOne({
      where: {
        id: fileId,
      }
    });

    if (!file) {
      return res.status(404).json({
        message: 'File not found!'
      });
    }
    // Query to delete a file
    await File.destroy({
      where: {
        id: fileId,
        project_id: projectId
      }
    });

    // Query to count number of files
    const fileCount = await File.count({
      where: {
        project_id: projectId
      }
    });

    // Query to update file count in project
    await Project.update(
      {
        files_count: fileCount
      },
      {
        where: {
          id: projectId
        }
      }
    );

    // Delete physical file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return res.status(200).json({
      message: 'File deleted successfully!'
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Server error!',
      error: err.message
    });
  }
};


module.exports = {
  uploadFiles,
  getProjectFiles,
  deleteFile
};