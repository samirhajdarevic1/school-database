const path = require('path');

const express = require('express');

const subjectsController = require('../controllers/subjects');

const router = express.Router();

router.get('/', subjectsController.getIndex);

router.get('/subjects', subjectsController.getSubjects);

router.get('/subjects/edit/:subjectId', subjectsController.getEditSubject);

router.post('/subjects/edit-subject', subjectsController.postEditSubject);

router.post('/subjects', subjectsController.postAddSubject);

router.post('/subject-delete', subjectsController.postDeleteSubject);

module.exports = router;
