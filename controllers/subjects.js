const sequelize = require('../util/database');
const Subject = require('../models/subject');

exports.getIndex = (req, res, next) => {
  res.render('teachers/index', {
    pageTitle: 'e-Diary',
    path: '/',
  });
};
exports.getSubjects = (req, res, next) => {
  Subject.findAll()
    .then((subjects) => {
      res.render('subjects/subjects', {
        subjects: subjects,
        pageTitle: 'e-Diary',
        path: '/subjects',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddSubject = (req, res, next) => {
  const name = req.body.name;
  const teachers = req.body.teachers;
  //create() -> kreira i automatski sprema u bazu
  Subject.create({
    name: name,
    teachers: teachers,
  })
    .then((result) => {
      console.log(result);
      res.redirect('/subjects');
    })
    .catch((err) => {
      console.log(err);
    });
};
/* exports.getsubject = (req, res, next) => {
  const subjectId = req.params.subjectId;
  console.log('ID:', subjectId);

  subject.findByPk(subjectId)
    .then((subject) => {
      res.render('subjects/subject-detail', {
        subject: subject,
        pageTitle: subject.name,
        path: '/subjects',
      });
    })
    .catch((err) => console.log(err));
}; */
exports.postDeleteSubject = (req, res, next) => {
  const subjectId = req.body.subjectId;
  console.log(subjectId);
  Subject.findByPk(subjectId)
    .then((subject) => {
      return subject.destroy();
    })
    .then((result) => {
      console.log('DESTROYED subject');
      res.redirect('subjects');
    })
    .catch((err) => console.log(err));
};
