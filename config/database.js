const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'recrutment',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: 3306,
    pool: {
      max: 10,
      min: 0,
      acquire: 1000000,
      idle: 1000000
    }
  }
);

module.exports = sequelize;