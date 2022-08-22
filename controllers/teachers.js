const sequelize = require('../util/database');
const Teacher = require('../models/teachers');

exports.getIndex = (req, res, next) => {
  res.render('teachers/index', {
    pageTitle: 'e-Diary',
    path: '/',
  });
};
exports.getTeachers = (req, res, next) => {
  Teacher.findAll()
    .then((teachers) => {
      res.render('teachers/teachers', {
        teachers: teachers,
        pageTitle: 'e-Diary',
        path: '/teachers',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddTeacher = (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const subjects = req.body.subjects;
  console.log(req.subject);
  //create() -> kreira i automatski sprema u bazu
  Teacher.create({
    name: name,
    lastName: lastName,
    subjects: subjects,
    subjectId: req.subject.id,
  })
    .then((result) => {
      // console.log(result);
      res.redirect('/teachers');
    })
    .catch((err) => {
      console.log(err);
    });
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
exports.postDeleteTeacher = (req, res, next) => {
  const teacherId = req.body.teacherId;
  console.log(teacherId);
  Teacher.findByPk(teacherId)
    .then((teacher) => {
      return teacher.destroy();
    })
    .then((result) => {
      console.log('DESTROYED TEACHER');
      res.redirect('teachers');
    })
    .catch((err) => console.log(err));
};
