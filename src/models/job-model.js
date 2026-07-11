const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  project_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'projects',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'PENDING'
  },

  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  outputPath: {
    type: DataTypes.STRING,
    allowNull: true
  },

  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }

}, {
  tableName: 'jobs',
});

module.exports = Job;