const path = require('path');

const express = require('express');

const subjectsController = require('../controllers/subjects');

const router = express.Router();

router.get('/', subjectsController.getIndex);

router.get('/subjects', subjectsController.getSubjects);

router.post('/subjects', subjectsController.postAddSubject);

router.post('/subject-delete', subjectsController.postDeleteSubject);

module.exports = router;
