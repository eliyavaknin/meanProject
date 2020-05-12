const express = require('express');
const router = express.Router();

// Require the controller
const scrap_controller = require('../controllers/scraps');


// a simple test url to check that all of our files are communicating correctly.
// router.get('/test', course_controller.test);
// module.exports = router;

router.get('', scrap_controller.getAllScraps);
module.exports = router;