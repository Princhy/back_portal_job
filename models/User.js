const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9\s+()-]+$/, 
    },
  },
  photo:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('candidate', 'recruiter'),
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = User;
