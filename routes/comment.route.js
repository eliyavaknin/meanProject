const express = require('express');
const router = express.Router();

// Require the controller
const comment_controller = require('../controllers/comments.controller');


//create
router.post('', comment_controller.create);

//read
// router.get('/:id', lesson_controller.lesson_details);

// //read all
// router.get('', lesson_controller.courses_details);

// //update
// router.put('/:id', lesson_controller.update);

// //delete
router.delete('/:courseId/:commentId', comment_controller.delete);

module.exports = router;