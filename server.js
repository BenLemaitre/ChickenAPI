// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
var db        	     = require('./config/db');
const app            = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
	if (err) return console.log(err)
	                  
	db = database.db("chicken-api")
	require('./app/routes')(app, db);

	require('./app/routes')(app, {});

	app.listen(port, () => {
	  console.log('We are live on ' + port);
	});
});