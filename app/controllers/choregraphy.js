var Choregraphy = require('../models/choregraphy');

exports.choregraphy_list = function(req, res) {
    Choregraphy.find(function(err, items) {
        if(err) return next(err);
        res.send(items);
    });
}

exports.choregraphy_create = function (req, res) {
    var choregraphy = new Choregraphy(
        {
            name: req.body.name,
            btMac: req.body.btMac,
            btPw: req.body.btPw
        }
    );

    choregraphy.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Choregraphy ' + choregraphy.name + ' created successfully')
    })
};

exports.choregraphy_details = function (req, res) {
    Choregraphy.findById(req.params.id, function (err, item) {
        if (err) return next(err);
        res.send(item);
    })
};

exports.choregraphy_update = function (req, res) {
    Choregraphy.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, choregraphy) {
        if (err) return next(err);
        res.send('Choregraphy udpated.');
    });
};

exports.choregraphy_delete = function (req, res) {
    Choregraphy.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
