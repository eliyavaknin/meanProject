const express = require('express');
const router = express.Router();

// Require the controller
const lesson_controller = require('../controllers/lesson.controller');


//create
router.post('', lesson_controller.create);

// //read
// router.get('/:id', lesson_controller.course_details);

// //read all
// router.get('', lesson_controller.courses_details);

// //update
// router.put('/:id', lesson_controller.update);

// //delete
// router.delete('/:id', lesson_controller.delete);

module.exports = router;