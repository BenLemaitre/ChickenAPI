var Puppet = require('../models/puppet');

exports.puppet_list = function(req, res) {
    Puppet.find(function(err, items) {
        if(err) return next(err);
        res.send(items);
    });
};

exports.puppet_create = function (req, res) {
    var puppet = new Puppet(
        {
            name: req.body.name,
            btMac: req.body.btMac,
            btPw: req.body.btPw
        }
    );

    puppet.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Puppet ' + puppet.name + ' created successfully')
    });
};

exports.puppet_details = function (req, res) {
    Puppet.findById(req.params.id, function (err, item) {
        if (err) return next(err);
        res.send(item);
    });
};

exports.puppet_update = function (req, res) {
    Puppet.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, puppet) {
        if (err) return next(err);
        res.send('Puppet udpated.');
    });
};

exports.puppet_delete = function (req, res) {
    Puppet.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};
