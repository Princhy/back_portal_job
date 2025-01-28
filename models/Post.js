const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Job = require('./Job');
const Entite = require('./Entite');

const Postuler = sequelize.define('Postuler', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cv_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    }
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Job,
      key: 'id',
    }
  },
  entiteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Entite,
      key: 'id',
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
  },
});

// Associations
Postuler.belongsTo(User, { foreignKey: 'userId' });
Postuler.belongsTo(Job, { foreignKey: 'jobId' });
Postuler.belongsTo(Entite, { foreignKey: 'entiteId' });

module.exports = Postuler;
