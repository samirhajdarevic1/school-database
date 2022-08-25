const sequelize = require('../util/database');
const Grade = require('../models/grade');
const SchoolClass = require('../models/school-class');
const Pupil = require('../models/pupil');
const Subject = require('../models/subject');

exports.getIndex = (req, res, next) => {
  res.render('pupils/index', {
    pageTitle: 'e-Diary',
    path: '/',
  });
};
exports.getGrades = async (req, res, next) => {
  const pupilId = req.query.pupilId;
  res.render('grades/grades', {
    pupil: await Pupil.findByPk(pupilId),
    subjects: await Subject.findAll(),
    grades: await Grade.findAll(),
    pageTitle: 'e-Diary',
    path: '/grades',
  });
};

exports.postAddGrade = async (req, res, next) => {
  const grade = req.body.grade;
  const subjectId = req.body.subjectId;
  const pupilId = req.body.pupilId;
  try {
    await Grade.create({
      grade: grade,
      subjectId: subjectId,
      pupilId: pupilId,
    });
    return res.redirect('grades');
  } catch (err) {
    console.log(err);
  }
};
exports.getGrade = async (req, res, next) => {
  const pupilId = req.params.pupilId;
  try {
    const pupil = await Pupil.findByPk(pupilId);
    const classes = await SchoolClass.findByPk(pupil.schoolClassId);
    const response = await res.render('pupils/pupil-detail', {
      pupil: pupil,
      classes: classes,
      pageTitle: pupil.name,
      path: '/pupils',
    });
  } catch (err) {
    console.log(err);
  }
};
exports.postDeleteGrade = async (req, res, next) => {
  const pupilId = req.body.pupilId;
  console.log(pupilId);

  try {
    console.log('Destroying pupil');
    const pupil = await Pupil.findByPk(pupilId);
    await pupil.destroy();
    console.log('Pupil destroyed');
    await res.redirect('pupils');
  } catch (err) {
    console.log(err);
  }
};
