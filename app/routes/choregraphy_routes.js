// choregraphy_routes.js
var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

	//Create
	app.post('/choregraphies', (req, res) => {
		const choregraphy = { name: req.body.name };
		db.collection('choregraphies').insert(choregraphy, (err, result) => {
		  if (err) {
		    res.send({ 'error': 'An error has occurred' });
		  } else {
		    res.send(result.ops[0]);
		  }
		});
	});

	//Read
	app.get('/choregraphies/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('choregraphies').findOne(details, (err, item) => {
		  if (err) {
		    res.send({'error':'An error has occurred'});
		  } else {
		    res.send(item);
		  }
		});
	});

	//Update
	app.put('/choregraphies/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		const choregraphy = { name: req.body.name };
		db.collection('choregraphies').update(details, choregraphy, (err, result) => {
		  if (err) {
		      res.send({'error':'An error has occurred'});
		  } else {
		      res.send(choregraphy);
		  }
		});
	});

	//Delete
	app.delete('/choregraphies/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('choregraphies').remove(details, (err, item) => {
		  if (err) {
		    res.send({'error':'An error has occurred'});
		  } else {
		    res.send('Choregraphy ' + id + ' deleted!');
		  }
		});
	});
};
