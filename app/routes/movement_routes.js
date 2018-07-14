// movement_routes.js
var express = require('express');
var router = express.Router();
var movement_controller = require('../controllers/movement');

router.get('/', movement_controller.movement_list); 				//List all movements
router.post('/create', movement_controller.movement_create); 		//Create a movement
router.get('/:id', movement_controller.movement_details); 			//Get details of a movement
router.put('/:id/update', movement_controller.movement_update);		//Update a movement
router.delete('/:id/delete', movement_controller.movement_delete);	//Delete a movement

module.exports = router;