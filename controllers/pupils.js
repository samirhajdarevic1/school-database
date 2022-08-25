const sequelize = require('../util/database');
const Pupil = require('../models/pupil');
const SchoolClass = require('../models/school-class');
const Subject = require('../models/subject');

exports.getIndex = (req, res, next) => {
  res.render('pupils/index', {
    pageTitle: 'e-Diary',
    path: '/',
  });
};
exports.getPupils = async (req, res, next) => {
  res.render('pupils/pupils', {
    pupils: await Pupil.findAll(),
    classes: await SchoolClass.findAll(),
    pageTitle: 'Pupils',
    path: '/pupils',
  });
};

exports.postAddPupil = async (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const birthday = req.body.birthday;
  const gender = req.body.gender;
  const father = req.body.father;
  const mother = req.body.mother;
  console.log(mother);
  console.log(req.body);
  const classId = req.body.schoolClass;
  console.log(classId);
  //create() -> kreira i automatski sprema u bazu
  try {
    await Pupil.create({
      name: name,
      lastName: lastName,
      birthday: birthday,
      gender: gender,
      father: father,
      mother: mother,
      schoolClassId: classId,
    });
    return res.redirect('pupils');
  } catch (err) {
    console.log(err);
  }
};
exports.getPupil = async (req, res, next) => {
  const pupilId = req.params.pupilId;
  console.log('ID:', pupilId);
  try {
    const pupil = await Pupil.findByPk(pupilId);
    const classes = await SchoolClass.findByPk(pupil.schoolClassId);
    const subjects = await Subject.findAll();
    const response = await res.render('pupils/pupil-detail', {
      pupil: pupil,
      classes: classes,
      subjects: subjects,
      pageTitle: pupil.name,
      path: '/pupils',
    });
  } catch (err) {
    console.log(err);
  }
};
exports.postDeletePupil = async (req, res, next) => {
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
