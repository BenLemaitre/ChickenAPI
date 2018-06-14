var User = require('../models/user');
var path = require('path');

//GET route for reading data
// exports.user_index = function (req, res, next) {
//   return res.sendFile('/Users/benjaminlemaitre/Documents/ChickenAPI/templateLogReg/index.html');
// };

//POST route for updating data
exports.user_register = function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
};

// POST checking the login data
exports.user_login = function (req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  }
}; 

// GET route after registering
exports.user_profile = function (req, res, next) {
  User.findById(req.session.userId)
    .populate('puppets')
    .populate('choregraphies')
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send(user
            // '<h1>Name: </h1>' + user.username + 
            // '<h2>Mail: </h2>' + user.email + 
            // '<h2>Puppets: </h2>' + user.puppets[0].name +
            // '<h2>Choregraphies: </h2>' + user.choregraphies[0].name +
            // '<br><a type="button" href="/logout">Logout</a>'
            )
        }
      }
    });
};

// GET for logout logout
exports.user_logout = function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
};