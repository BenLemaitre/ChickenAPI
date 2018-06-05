// chicken_routes.js
var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

	//Create
	app.post('/chickens', (req, res) => {
		const chicken = { name: req.body.name, btId: req.body.btId };
		db.collection('chickens').insert(chicken, (err, result) => {
		  if (err) { 
		    res.send({ 'error': 'An error has occurred' }); 
		  } else {
		    res.send(result.ops[0]);
		  }
		});
	});

	//Read
	app.get('/chickens/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('chickens').findOne(details, (err, item) => {
		  if (err) {
		    res.send({'error':'An error has occurred'});
		  } else {
		    res.send(item);
		  } 
		});
	});

	//Update
	app.put('/chickens/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		const chicken = { name: req.body.name, btId: req.body.btId };
		db.collection('chickens').update(details, chicken, (err, result) => {
		  if (err) {
		      res.send({'error':'An error has occurred'});
		  } else {
		      res.send(chicken);
		  } 
		});
	});

	//Delete
	app.delete('/chickens/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('chickens').remove(details, (err, item) => {
		  if (err) {
		    res.send({'error':'An error has occurred'});
		  } else {
		    res.send('Chicken ' + id + ' deleted!');
		  } 
		});
	});
};