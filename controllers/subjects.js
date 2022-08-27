const sequelize = require('../util/database');
const Subject = require('../models/subject');
const TeacherSubject = require('../models/teacher-subject');
const Teacher = require('../models/teacher');

exports.getIndex = (req, res, next) => {
  res.render('teachers/index', {
    pageTitle: 'e-Diary',
    path: '/',
  });
};
exports.getSubjects = async (req, res, next) => {
  try {
    const teacherSubject = await TeacherSubject.findAll();
    const teachers = await Teacher.findAll();
    const subjects = await Subject.findAll();
    res.render('subjects/subjects', {
      subjects: subjects,
      teachers: teachers,
      teacherSubject: teacherSubject,
      pageTitle: 'Subjects',
      path: '/subjects',
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postAddSubject = async (req, res, next) => {
  const name = req.body.name;
  const teacherId = req.body.teacher;
  try {
    const createdSubject = await Subject.create({ name: name });
    await TeacherSubject.create({
      teacherId: teacherId,
      subjectId: createdSubject.id,
    });
    await res.redirect('/subjects');
  } catch (err) {
    console.log(err);
  }
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
