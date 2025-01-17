const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: 3308,
  pool: {
    max: 10,
    min: 0,
    acquire: 1000000,
    idle: 1000000
  }
});

module.exports = sequelize;
