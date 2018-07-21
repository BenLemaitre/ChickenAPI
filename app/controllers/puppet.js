var Puppet = require('../models/puppet');
var User = require('../models/user');

//List of the puppets made by the user
exports.puppet_list = function(req, res, next) {
    Puppet.find({ 'user': req.payload._id })
        .exec(function(err, items) {
            if(err) return next(err);
            res.send(items);
    });
};

//Create a puppet
exports.puppet_create = function (req, res, next) {
    var puppet = new Puppet(
        {
            name: req.body.name,
            btMac: req.body.btMac,
            btPw: req.body.btPw,
            user: req.payload._id
        }
    );

    console.log(req.payload);
    puppet.save(function (err) {
        if (err) {
            return next(err);
        }
        //We add the new puppet to the user's puppets
        User.findByIdAndUpdate(req.payload._id, { 
            $push: { 'puppets': puppet._id }
        }, { 'new': true },
        function(err) {
            if(err)
                return next(err);
        });
        
        res.send('Puppet ' + puppet.name + ' created successfully')
    });
};

//Get the details of a specific puppet (found by Id)
exports.puppet_details = function (req, res, next) {
    Puppet.findById(req.params.id, function (err, item) {
        if (err) return next(err);
        res.send(item);
    });
};

//Update a puppet (found by Id)
exports.puppet_update = function (req, res, next) {
    Puppet.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, puppet) {
        if (err) return next(err);
        res.send('Puppet udpated.');
    });
};

//Delete a puppet
exports.puppet_delete = function (req, res, next) {
    Puppet.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};
