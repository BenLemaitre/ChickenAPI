var Movement = require('../models/movement');

exports.movement_list = function(req, res, next) {
    Movement.find(function(err, items) {
        if(err) return next(err);
        res.send(items);
    });
}

exports.movement_create = function (req, res, next) {
    var movement = new Movement(
        {
            name: req.body.name
        }
    );

    movement.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Movement ' + movement.name + ' created successfully')
    });
};

exports.movement_details = function (req, res, next) {
    Movement.findById(req.params.id, function (err, item) {
        if (err) return next(err);
        res.send(item);
    });
};

exports.movement_update = function (req, res, next) {
    Movement.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, movement) {
        if (err) return next(err);
        res.send('Movement udpated.');
    });
};

exports.movement_delete = function (req, res, next) {
    Movement.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};
