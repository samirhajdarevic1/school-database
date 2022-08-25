const sequelize = require('../util/database');
const Pupil = require('../models/pupil');
const SchoolClass = require('../models/school-class');

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
    console.log(schoolClass);
    const pupils = await Pupil.findAll();
    console.log(pupils);
    const classes = await SchoolClass.findAll();
    const response = await res.render('classes/classes', {
      schoolClass: schoolClass,
      pupils: pupils,
      classes: classes,
      pageTitle: 'Classes',
      path: '/classes',
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postAddClass = async (req, res, next) => {
  const name = req.body.name;
  try {
    await SchoolClass.create({
      name: name,
    });
    return res.redirect('classes');
  } catch (err) {
    console.log(err);
  }
};
exports.getClass = async (req, res, next) => {
  console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
  const classId = req.query.schoolClass;
  console.log('IDDDDDDDDDDDDDDDDDDDDDDDd:', classId);
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
  console.log(classId);

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
