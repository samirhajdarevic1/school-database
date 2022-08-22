const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Teacher = sequelize.define('teacher', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  subjects: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Teacher;
