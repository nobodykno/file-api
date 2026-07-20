import File from './file-model.js';
import Job from "./job-model.js";
import Project from "./project-model.js";
import User from './user-model.js';

User.hasMany(Project, {
    foreignKey: "user_id",
    as: "projects",

    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Project.belongsTo(User, {
    foreignKey: "user_id",
    as: "owner",
});

Project.hasMany(File,{
    foreignKey:"project_id",
    as:"files",

    onDelete:"CASCADE",

    onUpdate:"CASCADE"
});

File.belongsTo(Project,{
    foreignKey:"project_id",
    as:"project"
});

Project.hasMany(Job,{
    foreignKey:"project_id",
    as:"jobs",

    onDelete:"CASCADE",

    onUpdate:"CASCADE"
});

Job.belongsTo(Project,{
    foreignKey:"project_id",
    as:"project"
});