var Choregraphy = require('../models/choregraphy');
var User = require('../models/user');
var path = require('path');
var http = require('http');
var fs = require('fs');

exports.choregraphy_list = function(req, res, next) {
    Choregraphy.find(function(err, items) {
        if(err) return next(err);
        res.send(items);
    });
}

exports.choregraphy_create = function (req, res, next) {
    var choregraphy = new Choregraphy(
        {
            name: req.body.name,
            user: req.session.userId,
            movement: req.body.movement
        }
    );

    choregraphy.save(function (err) {
        if (err) {
            return next(err);
        }

        User.findByIdAndUpdate(req.session.userId, { 
            $push: { 'choregraphies': choregraphy._id }
        }, { 'new': true },
        function(err) {
            if(err) return next(err);
        });

        createScript(choregraphy);

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

exports.choregraphy_download = function (req, res, next) {
    Choregraphy.findById(req.params.id)
        .exec(function (err, choregraphy) {
            if (err) return next(err);
          var fileLocation = path.join(__dirname + "/../../scripts/" + choregraphy.name + ".c");
          //console.log(fileLocation);
          res.download(fileLocation);
        }
    );
}

function createScript(choregraphy) {
    var pathScript = path.join(__dirname + "/../../scripts/" + choregraphy.name + ".c");

    Choregraphy.findById(choregraphy.id)
        .populate('movement')
        .exec(function (err, item) {
            if (err) return next(err);
            
            fs.writeFileSync(pathScript, "C structure\n", function(err) {
                if(err) return next(err);
            });

            for(var i = 0; i < item.movement.length; i++) {
                fs.appendFileSync(pathScript, '\n\n' + item.movement[i].name, function(err) {
                    if(err) next(err);
                });
            }
         }
    );
}
