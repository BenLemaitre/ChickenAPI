var Choregraphy = require('../models/choregraphy');
var User = require('../models/user');
var inoScripts = require('./inoScripts');
var path = require('path');
var async = require('async');
var fs = require('fs');

exports.choregraphy_list = function(req, res, next) {
    Choregraphy.find({ 'user': req.payload._id })
        .populate('movement')
        .exec(function(err, items) {
            if(err) return next(err);
            res.send(items);
    });
}

exports.choregraphy_create = function (req, res, next) {
    var choregraphy = new Choregraphy(
        {
            name: req.body.name,
            user: req.payload._id,
            movement: req.body.movement
        }
    );

    choregraphy.save(function (err) {
        if (err) {
            return next(err);
        }

        User.findByIdAndUpdate(req.payload._id, {
            $push: { 'choregraphies': choregraphy._id }
        }, { 'new': true },
        function(err) {
            if(err) return next(err);
        });

        res.send('Choregraphy ' + choregraphy.name + ' created successfully')
    });
};

exports.choregraphy_details = function (req, res, next) {
    Choregraphy.findById(req.params.id)
        .populate('movement')
        .exec(function (err, item) {
            if (err) return next(err);
            res.send(item);
         }
    );
};

exports.choregraphy_update = function (req, res, next) {
    Choregraphy.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, choregraphy) {
        if (err) return next(err);
        res.send('Choregraphy udpated.');
    });
};

exports.choregraphy_delete = function (req, res, next) {
    Choregraphy.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};

exports.choregraphy_generate = function (req, res, next) {
    var count = 0;
    var ts = new Date();
    var fileName = "Choregraphies_" + ts.getFullYear() + ts.getMonth() + ts.getDate() +
        "_" + ts.getHours() + ts.getMinutes() + ts.getSeconds()
    var pathScript = path.join(__dirname + "/../../scripts/" + fileName + ".ino");
    var choregraphies = req.body.choregraphy;

    if(!Array.isArray(choregraphies))
        choregraphies = [req.body.choregraphy];

    fs.writeFileSync(pathScript, inoScripts.arduinoStart(choregraphies), function(err) {
        if(err) return next(err);
    });

    async.forEach(choregraphies, function(choregraphy, callback) {
        Choregraphy.findById(choregraphy)
            .populate('movement')
            .exec(function (err, c) {
                if (err) return next(err);

                if(c == null || c == undefined) {
                    callback('Choregraphy not found!');
                    return res.status(404);
                }

                fs.appendFileSync(pathScript, "\n\nvoid choregraphy" + count + "(){", function(err) {
                    if(err) return next(err);
                });

                for(var j = 0; j < c.movement.length; j++) {
                    fs.appendFileSync(pathScript, '\n\n' + inoScripts.arduinoMovement(c.movement[j]), function(err) {
                        if(err) next(err);
                    });
                }

                fs.appendFileSync(pathScript, "\n}\n", function(err) {
                    if(err) return next(err);
                });

                count++;

                callback();
            });
    }, function (err) {
        if(err) return next(err);
        res.download(pathScript);
    });
};
