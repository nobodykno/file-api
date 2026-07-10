const projects = require('../data/projects.json');

const getProjects = () => {
  return projects;
};

const saveProjects = (updatedProjects) => {
  projects.length = 0;
  projects.push(...updatedProjects);
};

const createProject = (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: 'Name and description are required!' });
    }

    const projects = getProjects();

    const newProject = {
      id: projects.length + 1,
      name,
      description,
      filesCount: 0,
      jobsCount: 0,
      createdAt: new Date().toLocaleString(),
    };

    projects.push(newProject);
    saveProjects(projects);

    res.status(201).json({
      message: 'Project created successfully!',
      project: newProject,
    });
  } catch (error) {
    res.status(500).json({ message: 'Project Cannot be created' });
  }
};

const getAllProjects = (req, res) => {
  const projects = getProjects();

  res.status(200).json({
    message: 'Projects fetched successfully!',
    projects,
  });
};

const getProjectById = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const projects = getProjects();

    const project = projects.find((p) => p.id === id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found!' });
    }

    res.status(200).json({
      message: 'Project fetched successfully!',
    });
  } catch (error) {
    res.status(500).json({ message: 'Project cannot be fetched!' });
  }
};

const updateProject = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: 'Name and description are required!' });
    }

    const projects = getProjects();

    const index = projects.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Project not found!' });
    }

    projects[index] = {
      ...projects[index],
      name,
      description,
      updatedAt: new Date().toLocaleString(),
    };

    saveProjects(projects);

    res.status(200).json({
      message: 'Project updated successfully!',
      project: projects[index],
    });


  } catch (error) {
    res.status(500).json({ message: 'Project cannot be updated !' });
  }
};

const deleteProject = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const projects = getProjects();

    const project = projects.find((p) => p.id === id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found!' });
    }

    const updatedProjects = projects.filter((p) => p.id !== id);
    saveProjects(updatedProjects);

    res.status(200).json({
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
