/* const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'school-database',
  password: 'nssglobus8',
});

module.exports = pool.promise(); */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('school-database', 'root', 'nssglobus8', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
