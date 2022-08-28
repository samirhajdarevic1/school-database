const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Teacher = require('./models/teacher');
const Subject = require('./models/subject');
const Pupil = require('./models/pupil');
const SchoolClass = require('./models/school-class');
const Grade = require('./models/grade');
const TeacherSubject = require('./models/teacher-subject');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const pupilsRoutes = require('./routes/pupils');
const teachersRoutes = require('./routes/teachers');
const subjectRoutes = require('./routes/subjects');
const schoolClassesRoutes = require('./routes/classes');
const gradeRoutes = require('./routes/grades');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(pupilsRoutes);
app.use(teachersRoutes);
app.use(subjectRoutes);
app.use(schoolClassesRoutes);
app.use(gradeRoutes);

app.use(errorController.get404);

TeacherSubject.belongsTo(Teacher, { constraints: true, onDelete: 'CASCADE' });
Teacher.hasMany(TeacherSubject, {
  constraints: true,
  onDelete: 'CASCADE',
  hooks: true,
});
TeacherSubject.belongsTo(Subject, { constraints: true, onDelete: 'CASCADE' });
Subject.hasMany(TeacherSubject, {
  constraints: true,
  onDelete: 'CASCADE',
  hooks: true,
});

Pupil.hasMany(Grade);
Grade.belongsTo(Pupil);

SchoolClass.hasMany(Pupil);
Pupil.belongsTo(SchoolClass);

Subject.hasMany(Grade);
Grade.belongsTo(Subject);

sequelize
  .sync({ force: false })
  .then((rrr) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
