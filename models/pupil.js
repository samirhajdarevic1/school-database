/* const db = require('../util/database');

module.exports = class Pupil {
  constructor(id, name, lastName, father, mother) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.father = father;
    this.mother = mother;
  }

  save() {
    console.log([this.name, this.lastName, this.father, this.mother]);
    return db.execute(
      'INSERT INTO pupils (name, lastName, father, mother) VALUES (?, ?, ?, ?)',
      [this.name, this.lastName, this.father, this.mother]
    );
  }

  static deleteById(id) {
    return db.execute(
      'INSERT INTO pupils (name, lastName, father, mother) VALUES (?, ?, ?, ?)',
      [this.name, this.lastName, this.father, this.mother]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM pupils');
  }

  static findById() {}
};
 */

const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Pupil = sequelize.define('pupil', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  birthday: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
  },
  father: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mother: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Pupil;
