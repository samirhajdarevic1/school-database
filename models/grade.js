const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Grade = sequelize.define('grade', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  gradesDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});
module.exports = Grade;
