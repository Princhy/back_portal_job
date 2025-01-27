const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Job = require('./Job');
const Entite = require('./Entite');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Job,
      key: 'id'
    }
  },
  entiteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Entite,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending'
  }
});

// Associations
Post.belongsTo(User, { foreignKey: 'userId' });
Post.belongsTo(Job, { foreignKey: 'jobId' });
Post.belongsTo(Entite, { foreignKey: 'entiteId' });

module.exports = Post;