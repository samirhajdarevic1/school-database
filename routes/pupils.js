const path = require('path');

const express = require('express');

const pupilsController = require('../controllers/pupils');

const router = express.Router();

router.get('/', pupilsController.getIndex);

router.get('/pupils', pupilsController.getPupils);

router.get('/pupils/:pupilId', pupilsController.getPupil);

router.get('/pupils/edit/:pupilId', pupilsController.getEditPupil);

router.post('/pupils/edit-pupil', pupilsController.postEditPupil);

router.post('/pupils', pupilsController.postAddPupil);

router.post('/pupil-delete', pupilsController.postDeletePupil);

module.exports = router;
