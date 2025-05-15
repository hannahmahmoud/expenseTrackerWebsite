require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,         // DB name
  process.env.DB_USER,         // DB user
  process.env.DB_PASSWORD,     // DB password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // set true if you want to see raw SQL logs
  }
);

module.exports = sequelize;
