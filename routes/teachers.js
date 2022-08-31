const path = require('path');

const express = require('express');

const teachersController = require('../controllers/teachers');

const router = express.Router();

router.get('/', teachersController.getIndex);

router.get('/teachers', teachersController.getTeachers);

router.get('/teachers/:teacherId', teachersController.getTeacher);

router.get('/teachers/edit/:teacherId', teachersController.getEditTeacher);

router.post('/teachers/edit-teacher', teachersController.postEditTeacher);

router.post('/teacher-subject', teachersController.postTeacherSubject);

router.post('/teachers', teachersController.postAddTeacher);

router.post('/teacher-delete', teachersController.postDeleteTeacher);

module.exports = router;
