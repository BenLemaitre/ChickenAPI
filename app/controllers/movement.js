var Movement = require('../models/movement');


//List of all the movements created by all users
exports.movement_list = function(req, res, next) {
    Movement.find()
        .exec(function(err, items) {
            if(err) return next(err);
            res.send(items);
    });
}

//Create a movement
exports.movement_create = function (req, res, next) {
    var movement = new Movement(
        {
            name: req.body.name,
            steps: req.body.steps,
            time: req.body.time,
            direction: req.body.direction,
            height: req.body.height
        }
    );

    movement.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Movement ' + movement.name + ' created successfully')
    });
};

//Get the details of a specific movement (found by Id)
exports.movement_details = function (req, res, next) {
    Movement.findById(req.params.id, function (err, item) {
        if (err) return next(err);
        res.send(item);
    });
};

//Update a movement (found by Id)
exports.movement_update = function (req, res, next) {
    Movement.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, movement) {
        if (err) return next(err);
        res.send('Movement udpated.');
    });
};

//Delete a movement
exports.movement_delete = function (req, res, next) {
    Movement.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};
