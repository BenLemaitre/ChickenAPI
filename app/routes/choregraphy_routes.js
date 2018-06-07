// choregraphy_routes.js
var express = require('express');
var router = express.Router();
var choregraphy_controller = require('../controllers/choregraphy');

router.get('/', choregraphy_controller.choregraphy_list); 				//List all choregraphies
router.post('/create', choregraphy_controller.choregraphy_create); 		//Create a choregraphy
router.get('/:id', choregraphy_controller.choregraphy_details); 			//Get details of a choregraphy
router.put('/:id/update', choregraphy_controller.choregraphy_update);		//Update a choregraphy
router.delete('/:id/delete', choregraphy_controller.choregraphy_delete);	//Delete a choregraphy

module.exports = router;