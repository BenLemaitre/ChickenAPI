var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var user_controller = require('../controllers/user');

router.get('/', user_controller.user_index);				//Get index / login page
router.post('/register', user_controller.user_register);	//Register the user
router.post('/login', user_controller.user_login);			//Log in
router.get('/profile', auth, user_controller.user_profile); //Get profile page

module.exports = router;