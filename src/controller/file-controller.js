const fs = require('fs');
const path = require('path');


/** 
 *  
 * @param void
 * 
 * Return all files
 * 
 */

const getAllFiles = () => {

  const filePath = path.join(__dirname, '../data/files.json');
  const files = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(files);

};

/** 
 *  
 * @param files
 * 
 * save all files
 * 
 */

const saveFiles = (files) => {

  const filePath = path.join(__dirname, '../data/files.json');
  fs.writeFileSync(filePath, JSON.stringify(files));

};
/** 
 *  
 * @param void
 * 
 * return list of projects
 * 
 */

const getProjects = () => {

  const projectsPath = path.join(__dirname, '../data/project.json');
  const projects = fs.readFileSync(projectsPath, 'utf-8');
  return projects;

};

/** 
 *  
 * @param files
 * 
 * save to list of project
 * 
 */

const saveProjects = (files) => {

  const projectsPath = path.join(__dirname, '../data/project.json');
  fs.writeFileSync(projectsPath, JSON.stringify(files));

};

/** 
 *  
 * @param projectId
 * 
 * Upload files to the project
 * 
 */


const uploadFiles = (req, res) => {

  try {
    const projectId = +req.params.projectId;
    const projects = getProjects();
    const project = projects.find((p) => p.id === projectId);


    if (!project) {
      return res.status(404).json({ message: 'Project not found!' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded!' });
    }

    const files = getAllFiles();

    const newFiles = req.files.map((file) => ({
      id: Date.now() + Math.floor(Math.random() * 1000),
      projectId: projectId,
      name: file.originalname,
      fileName: file.filename,
      size: file.size,
      mimeType: file.mimetype,
      path: file.path,
      uploadedAt: new Date().toLocaleString()
    }));


    const updatedFiles = [...files, ...newFiles];
    saveFiles(updatedFiles);


    const projectIndex = projects.findIndex((p) => p.id === projectId);
    projects[projectIndex].filesCount = updatedFiles.filter(
      (f) => f.projectId === projectId
    ).length;
    saveProjects(projects);


    res.status(201).json({
      message: `${newFiles.length} file(s) uploaded successfully!`,
    });



  } catch (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large! Max 10MB allowed.' });
    }

    res.status(500).json({ message: 'Upload failed!', error: err.message });
  }

};

/** 
 *  
 * @param projectId
 * 
 * Get all project files
 * 
 */
const getProjectFiles = (req, res) => {

  try {

    const projectId = parseInt(req.params.projectId);

    const projects = getProjects();
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found!' });
    }


    const files = getAllFiles();

    const projectFiles = files.filter((f) => f.projectId === projectId);

    res.status(200).json({
      message: 'Files fetched successfully!',
      count: projectFiles.length,
      files: projectFiles
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error!' });
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
const deleteFile = (req, res) => {

  try {

    const projectId = parseInt(req.params.projectId);
    const fileId = parseInt(req.params.fileId);


    const projects = getProjects();
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found!' });
    }


    const files = getAllFiles();
    const file = files.find(
      (f) => f.id === fileId && f.projectId === projectId
    );


    if (!file) {
      return res.status(404).json({ message: 'File not found!' });
    }


    const updatedFiles = files.filter((f) => f.id !== fileId);
    saveFiles(updatedFiles);


    const projectIndex = projects.findIndex((p) => p.id === projectId);
    projects[projectIndex].filesCount = updatedFiles.filter(
      (f) => f.projectId === projectId
    ).length;
    saveProjects(projects);


    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }


    res.status(200).json({
      message: 'File deleted successfully!'
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message });
  }
};


module.exports = {
  uploadFiles,
  getProjectFiles,
  deleteFile
};