const sequelize = require('../util/database');
const Pupil = require('../models/pupil');
const SchoolClass = require('../models/school-class');
const Teacher = require('../models/teacher');

exports.getIndex = (req, res, next) => {
  res.render('pupils/index', {
    pageTitle: 'e-Diary',
    path: '/',
  });
};
exports.getClasses = async (req, res, next) => {
  const classId = req.query.schoolClass;
  try {
    const schoolClass = await SchoolClass.findByPk(classId);
    const pupils = await Pupil.findAll();
    const classes = await SchoolClass.findAll();
    const teachers = await Teacher.findAll();
    const response = await res.render('classes/classes', {
      schoolClass: schoolClass,
      pupils: pupils,
      classes: classes,
      teachers: teachers,
      pageTitle: 'Classes',
      path: '/classes',
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postAddClass = async (req, res, next) => {
  const name = req.body.name;
  const teacherId = req.body.teacher;
  try {
    await SchoolClass.create({
      name: name,
      teacherId: teacherId,
    });
    return res.redirect('classes');
  } catch (err) {
    console.log(err);
  }
};
exports.getClass = async (req, res, next) => {
  const classId = req.query.schoolClass;
  try {
    const classes = await SchoolClass.findByPk(classId);
    const pupil = await Pupil.findByPk(classes.pupilId);
    const response = await res.render('classes', {
      classes: classes,
      pupil: pupil,
      pageTitle: classes.name,
      path: '/class',
    });
  } catch (err) {
    console.log(err);
  }
};
exports.postDeleteClass = async (req, res, next) => {
  const classId = req.body.classId;
  try {
    console.log('Destroying Class');
    const schoolClass = await SchoolClass.findByPk(classId);
    await schoolClass.destroy();
    console.log('Class destroyed');
    await res.redirect('classes');
  } catch (err) {
    console.log(err);
  }
};
