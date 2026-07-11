
const model = require('../models/index');



/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: 'Name and description are required!' });
    }


    const newProject = {
      name: name,
      description: description,
      files_count: 0,
      jobs_count: 0,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()

    };

    //Query to insert project details into the table
    await model.Project.create(newProject);

    return res.status(201).json({
      message: 'Project created successfully!',
      result: newProject,
    });

  } catch (error) {
    return res.status(500).json({ message: 'Project Cannot be created', error: error });
  }
};

/**
 * 
 * @returns all  project
 */

const getAllProjects = async (req, res) => {

  // Query to get all projects
  try {
    const projects = await model.Project.findAll();

    return res.status(200).json({
      message: 'Projects fetched successfully!',
      result: projects,
    });
  }
  catch (error) {
    return res.status(500).json({
      message: 'Projects not fetched successfully!'
    });
  }

};


/**
 * 
 * @param projectId
 * @returns single project details
 * 
 */

const getProjectById = async (req, res) => {
  try {
    const id = parseInt(req.params.projectId);

    // Query to get single project details
    const projectDetails = await model.Project.findOne({
      where: {
        id: id
      }
    });

    if (!projectDetails) {
      return res.status(400).json({
        message: 'Project not found!',
        result: projectDetails
      });
    }

    return res.status(200).json({
      message: 'Project fetched successfully!',
      result: projectDetails
    });
  } catch (error) {
    return res.status(500).json({ message: 'Project cannot be fetched!' });
  }
};

/**
 * 
 * @param  projectId
 * @param  name
 * @param description
 * 
 */

const updateProject = async (req, res) => {
  try {
    const id = parseInt(req.params.projectId);

    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: 'Name and description are required!' });
    }

    //Query to update the project

    await model.Project.update(
      {
        name: name,
        description: description,
        files_count: 0,
        jobs_count: 0,
        updated_at: new Date().toLocaleString()
      },
      {
        where: {

          id: id
        }
      }
    );

    return res.status(200).json({
      message: 'Project updated successfully!',
    });


  } catch (error) {
    return res.status(500).json({ message: 'Project cannot be updated !' });
  }
};

/**
 * 
 * @param projectId 
 *
 * 
 */
const deleteProject = async (req, res) => {
  try {
    const id = parseInt(req.params.projectId);

    //Query to delete project
    await model.Project.destroy({
      where: {
        id: id
      }
    });

    return res.status(200).json({
      message: 'Project deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Project cannot be deleted!' });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
