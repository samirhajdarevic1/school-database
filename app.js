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

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const pupilsRoutes = require('./routes/pupils');
const teachersRoutes = require('./routes/teachers');
const subjectRoutes = require('./routes/subjects');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  Teacher.findByPk(1)
    .then((teacher) => {
      req.teacher = teacher; //ovdje cemo imati sequelize object teacher, na kojem možemo primjeniti sequelize motode kao što je npr destroy
      next(); //da se nastavi sa sljedecim korakom nakon što smo dobili teachera i spremili ga
    })
    .catch((err) => console.log(err));
});

app.use(pupilsRoutes);
app.use(teachersRoutes);
app.use(subjectRoutes);

app.use(errorController.get404);

/* Teacher.belongsTo(Subject, { constraints: true, onDelete: 'CASCADE' }); //kad se obriše predmet da se svi učitalji obrišu
Subject.hasMany(Teacher, { foreignKey: 'id', as: 'Id' }); */

Teacher.hasMany(Subject, {
  constraints: true,
  onDelete: 'CASCADE',
});
Subject.belongsToMany(Teacher, { through: 'teacher_subject' });

Pupil.hasMany(Grade);
Grade.belongsTo(Pupil);

SchoolClass.hasMany(Pupil);
Pupil.belongsTo(SchoolClass);

Subject.hasMany(Grade);
Grade.belongsTo(Subject);

sequelize
  .sync()
  .then((result) => {
    return Teacher.findByPk(1);
    //console.log(result);
  })
  .then((teacher) => {
    if (!teacher) {
      return Teacher.create({
        name: 'Mjo',
        lastName: 'M',
        birthday: '12-03-1995',
        gender: 'M',
      });
    }
    return teacher;
  })
  .then((teacher) => {
    console.log(teacher);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
