// puppet_routes.js
var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

	//Create
	app.post('/puppets', (req, res) => {
		const puppet = { name: req.body.name, btId: req.body.btId, btPw: req.body.btPw };
		db.collection('puppets').insert(puppet, (err, result) => {
		  if (err) {
		    res.send({ 'error': 'An error has occurred' });
		  } else {
		    res.send(result.ops[0]);
		  }
		});
	});

	//Read
	app.get('/puppets/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('puppets').findOne(details, (err, item) => {
		  if (err) {
		    res.send({'error':'An error has occurred'});
		  } else {
		    res.send(item);
		  }
		});
	});

	//Update
	app.put('/puppets/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		const puppet = { name: req.body.name, btId: req.body.btId, btPw: req.body.btPw };
		db.collection('puppets').update(details, puppet, (err, result) => {
		  if (err) {
		      res.send({'error':'An error has occurred'});
		  } else {
		      res.send(puppet);
		  }
		});
	});

	//Delete
	app.delete('/puppets/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('puppets').remove(details, (err, item) => {
		  if (err) {
		    res.send({'error':'An error has occurred'});
		  } else {
		    res.send('Puppet ' + id + ' deleted!');
		  }
		});
	});
};
