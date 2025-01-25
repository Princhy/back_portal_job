const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  publied_by:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  photo:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  type: {
    type: DataTypes.ENUM('emploi', 'stage'),
    allowNull: false,
    defaultValue: 'emploi',
    validate: {
      isIn: [['emploi', 'stage']]
    }
  },
  statuts:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["Disponible", "Non Disponible"]],
    },
  },
}, {
  timestamps: true,
});

module.exports = Job;
