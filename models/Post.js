const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
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
  post_by:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  photo:{
    type:DataTypes.STRING,
    allowNull:true,
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

module.exports = Post;
