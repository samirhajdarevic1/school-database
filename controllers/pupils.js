const sequelize = require('../util/database');
const Pupil = require('../models/pupils');

exports.getIndex = (req, res, next) => {
  res.render('pupils/index', {
    pageTitle: 'e-Diary',
    path: '/',
    //  });
  });
};
exports.getPupils = (req, res, next) => {
  Pupil.findAll()
    .then((pupils) => {
      res.render('pupils/pupils', {
        pupils: pupils,
        pageTitle: 'e-Diary',
        path: '/pupils',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddPupil = (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const father = req.body.father;
  const mother = req.body.mother;
  //create() -> kreira i automatski sprema u bazu
  Pupil.create({
    name: name,
    lastName: lastName,
    father: father,
    mother: mother,
  })
    .then((result) => {
      console.log(result);
      res.redirect('pupils');
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getPupil = (req, res, next) => {
  const pupilId = req.params.pupilId;
  console.log('ID:', pupilId);
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Pupil.findByPk(pupilId)
    .then((pupil) => {
      res.render('pupils/pupil-detail', {
        pupil: pupil,
        pageTitle: pupil.name,
        path: '/pupils',
      });
    })
    .catch((err) => console.log(err));
};
exports.postDeletePupil = (req, res, next) => {
  const pupilId = req.body.pupilId;
  console.log(pupilId);
  Pupil.findByPk(pupilId)
    .then((pupil) => {
      return pupil.destroy();
    })
    .then((result) => {
      console.log('DESTROYED PRODUCT');
      res.redirect('pupils');
    })
    .catch((err) => console.log(err));
};
