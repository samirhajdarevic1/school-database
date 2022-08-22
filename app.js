const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Teacher = require('./models/teachers');
const Subject = require('./models/subjects');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const pupilsRoutes = require('./routes/pupils');
const teachersRoutes = require('./routes/teachers');
const subjectRoutes = require('./routes/subjects');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  Subject.findByPk(1)
    .then((subject) => {
      req.subject = subject; //ovdje cemo imati sequelize object teacher, na kojem možemo primjeniti sequelize motode kao što je npr destroy
      next(); //da se nastavi sa sljedecim korakom nakon što smo dobili teachera i spremili ga
    })
    .catch((err) => console.log(err));
});

app.use(pupilsRoutes);
app.use(teachersRoutes);
app.use(subjectRoutes);

app.use(errorController.get404);

Teacher.belongsTo(Subject, { constraints: true, onDelete: 'CASCADE' }); //kad se obriše predmet da se svi učitalji obrišu
Subject.hasMany(Teacher, { foreignKey: 'id', as: 'Id' });

sequelize
  .sync()
  .then((result) => {
    return Subject.findByPk(1);
    //console.log(result);
  })
  .then((subject) => {
    if (!subject) {
      return Subject.create({
        name: 'Mjo',
        teachers: 'Mujic',
      });
    }
    return subject;
  })
  .then((subject) => {
    //console.log(teacher);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
