const path = require('path');

const express = require('express');

const teachersController = require('../controllers/teachers');

const router = express.Router();

router.get('/', teachersController.getIndex);

router.get('/teachers', teachersController.getTeachers);

router.get('/teachers/:teacherId', teachersController.getTeacher);

router.post('/teacher-subject', teachersController.postTeacherSubject);

router.post('/teachers', teachersController.postAddTeacher);

router.post('/teacher-delete', teachersController.postDeleteTeacher);

module.exports = router;
