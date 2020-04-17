const express = require('express');
const router = express.Router();

// Require the controller
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
module.exports = router;

//create
router.post('', product_controller.product_create);

//read
router.get('/:id', product_controller.product_details);

//read all
router.get('', product_controller.products_details);

//update
router.put('/:id', product_controller.product_update);

//delete
router.delete('/:id', product_controller.product_delete);