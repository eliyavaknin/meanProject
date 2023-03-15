const express = require('express');
const router = express.Router();

// Require the controller
const course_controller = require('../controllers/course.controller');


// a simple test url to check that all of our files are communicating correctly.
// router.get('/test', course_controller.test);
// module.exports = router;

//create
router.post('', course_controller.create);

//read
router.get('/:id', course_controller.course_details);

//read all
router.get('', course_controller.courses_details);

//update
router.put('/:id', course_controller.update);

//delete
router.delete('/:id', course_controller.delete);

//groupByCategory
router.delete('/groupByCategory', course_controller.groupByCategory);

//mapReduceQuery
router.delete('/mapReduce', course_controller.mapReduce);

module.exports = router;