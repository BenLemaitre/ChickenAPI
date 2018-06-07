var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// Importing routes
var puppet = require('./app/routes/puppet_routes');
var choregraphy = require('./app/routes/choregraphy_routes');
var movement = require('./app/routes/movement_routes');

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://localhost:27017/puppets-api';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Enable cors
app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/puppets', puppet);
app.use('/choregraphies', choregraphy);
app.use('/movements', movement);

var port = 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port);
});