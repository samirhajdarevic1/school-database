const sequelize = require('../util/database');
const Teacher = require('../models/teacher');

exports.getIndex = (req, res, next) => {
  res.render('teachers/index', {
    pageTitle: 'e-Diary',
    path: '/',
  });
};
exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.findAll();
    await res.render('teachers/teachers', {
      teachers: teachers,
      pageTitle: 'Teachers',
      path: '/teachers',
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postAddTeacher = async (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const birthday = req.body.birthday;
  const gender = req.body.gender;

  try {
    const createdTeacher = await Teacher.create({
      name: name,
      lastName: lastName,
      birthday: birthday,
      gender: gender,
    });
    await res.redirect('/teachers');
  } catch (err) {
    console.log(err);
  }
};

exports.getTeacher = (req, res, next) => {
  const TeacherId = req.params.TeacherId;
  console.log('ID:', TeacherId);

  Teacher.findByPk(TeacherId)
    .then((Teacher) => {
      res.render('teachers/Teacher-detail', {
        Teacher: Teacher,
        pageTitle: Teacher.name,
        path: '/teachers',
      });
    })
    .catch((err) => console.log(err));
};
exports.postDeleteTeacher = async (req, res, next) => {
  const teacherId = req.body.teacherId;
  console.log(teacherId);
  try {
    const teacher = await Teacher.findByPk(teacherId);
    console.log('DESTROYING TEACHER');
    await teacher.destroy();
    await res.redirect('/teachers');
  } catch (err) {
    console.log(err);
  }
};
