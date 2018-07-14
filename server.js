var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

// Importing routes
var puppet = require('./app/routes/puppet_routes');
var choregraphy = require('./app/routes/choregraphy_routes');
var movement = require('./app/routes/movement_routes');
var user = require('./app/routes/user_routes');

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://localhost:27017/puppets-api';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Initialize passport
require('./config/passport');
app.use(passport.initialize());

// Enable cors
app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header('Access-Control-Allow-Credentials', true);
   next();
});

// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/puppets', puppet);
app.use('/choregraphies', choregraphy);
app.use('/movements', movement);
app.use('/', user);

var port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('App listening on port ' + port);
});
