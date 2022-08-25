const path = require('path');

const express = require('express');

const classesController = require('../controllers/classes');

const router = express.Router();

router.get('/', classesController.getIndex);

router.get('/classes', classesController.getClasses);

router.get('/classes/:classId', classesController.getClass);

router.post('/classes', classesController.postAddClass);

router.post('/class-delete', classesController.postDeleteClass);

module.exports = router;
