const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const TeacherSubject = sequelize.define('teacher_subjects', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teacherId: {
    type: Sequelize.INTEGER,
  },
  subjectId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = TeacherSubject;
