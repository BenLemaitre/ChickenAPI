var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user');

// router.get('/', user_controller.user_index);				//Get index / login page
router.post('/register', user_controller.user_register);	//Register the user
router.post('/login', user_controller.user_login);			//Log in
router.get('/profile', user_controller.user_profile);   	//Get profile page (redirected from registration)
router.get('/logout', user_controller.user_logout);			//Logout and delete the session object

module.exports = router;