// puppet_routes.js
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var puppet_controller = require('../controllers/puppet');

router.get('/', auth, puppet_controller.puppet_list); 			//List all puppets
router.post('/create', auth, puppet_controller.puppet_create); 	//Create a puppet
router.get('/:id', puppet_controller.puppet_details); 			//Get details of a puppet
router.put('/:id/update', puppet_controller.puppet_update);		//Update a puppet
router.delete('/:id/delete', puppet_controller.puppet_delete);	//Delete a puppet

module.exports = router;