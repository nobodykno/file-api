
import model from "../models/index.js";
import { Request, Response, NextFunction } from 'express';


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
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

export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {

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

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
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

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.projectId);

    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: 'Name and description are required!' });
    }

    const projectDetails = await model.Project.findOne(
      {
        where: {
          id: id
        }
      }
    );

    //Query to update the project

    const project = await model.Project.update(
      {
        name: name,
        description: description,
        files_count: projectDetails.files_count,
        jobs_count: projectDetails.jobs_count,
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
      result: {
        name: name,
        description: description,
        files_count: projectDetails.files_count,
        jobs_count: projectDetails.jobs_count,
        created_at: projectDetails.created_at
      },
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
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.projectId);

    //Query to delete project
    await model.Job.destroy({
      where: {
        project_id: id
      }
    });
    
    await model.File.destroy({
      where: {
        project_id: id
      }
    });
    
    await model.Project.destroy({
      where: {
        id: id
      }
    });

    return res.status(200).json({
      message: 'Project deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Project cannot be deleted!'});
  }
};

