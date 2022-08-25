const path = require('path');

const express = require('express');

gradesController = require('../controllers/grades');

const router = express.Router();

router.get('/', gradesController.getIndex);

router.get('/grades', gradesController.getGrades);

router.get('/grades/:gradeId', gradesController.getGrade);

router.post('/grades', gradesController.postAddGrade);

router.post('/grade-delete', gradesController.postDeleteGrade);

module.exports = router;
