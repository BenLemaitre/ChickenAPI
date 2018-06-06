// movement_routes.js
var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

	//Create
	app.post('/movements', (req, res) => {
		const movement = { name: req.body.name };
		db.collection('movements').insert(movement, (err, result) => {
		  if (err) {
		    res.send({ 'error': 'An error has occurred' });
		  } else {
		    res.send(result.ops[0]);
		  }
		});
	});

	//Read
	app.get('/movements/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('movements').findOne(details, (err, item) => {
		  if (err) {
		    res.send({'error':'An error has occurred'});
		  } else {
		    res.send(item);
		  }
		});
	});

	//Update
	app.put('/movements/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		const movement = { name: req.body.name };
		db.collection('movements').update(details, movement, (err, result) => {
		  if (err) {
		      res.send({'error':'An error has occurred'});
		  } else {
		      res.send(movement);
		  }
		});
	});

	//Delete
	app.delete('/movements/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('movements').remove(details, (err, item) => {
		  if (err) {
		    res.send({'error':'An error has occurred'});
		  } else {
		    res.send('Movement ' + id + ' deleted!');
		  }
		});
	});
};
