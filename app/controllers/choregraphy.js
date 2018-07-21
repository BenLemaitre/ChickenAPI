var Choregraphy = require('../models/choregraphy');
var User = require('../models/user');
var inoScripts = require('./inoScripts');
var path = require('path');
var async = require('async');
var fs = require('fs');

//List of the choregraphies made by the user
exports.choregraphy_list = function(req, res, next) {
    Choregraphy.find({ 'user': req.payload._id })
        .populate('movement')
        .exec(function(err, items) {
            if(err) return next(err);
            res.send(items);
    });
}

//Create a choregraphy
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
        //We add the new choregraphy to the user's choregraphies
        User.findByIdAndUpdate(req.payload._id, {
            $push: { 'choregraphies': choregraphy._id }
        }, { 'new': true },
        function(err) {
            if(err) return next(err);
        });

        res.send('Choregraphy ' + choregraphy.name + ' created successfully')
    });
};

//Get the details of a specific choregraphy (found by Id)
exports.choregraphy_details = function (req, res, next) {
    Choregraphy.findById(req.params.id)
        .populate('movement')
        .exec(function (err, item) {
            if (err) return next(err);
            res.send(item);
         }
    );
};

//Update a choregraphy (found by Id)
exports.choregraphy_update = function (req, res, next) {
    Choregraphy.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, choregraphy) {
        if (err) return next(err);
        res.send('Choregraphy udpated.');
    });
};

//Delete a choregraphy
exports.choregraphy_delete = function (req, res, next) {
    Choregraphy.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};

//Generate a .ino (arduino) script from the selected choregraphies
exports.choregraphy_generate = function (req, res, next) {
    var count = 0;
    var ts = new Date();
    var fileName = "Choregraphies_" + ts.getFullYear() + ts.getMonth() + ts.getDate() +
        "_" + ts.getHours() + ts.getMinutes() + ts.getSeconds();
    //We set the path of the script to the "scripts" folder
    var pathScript = path.join(__dirname + "/../../scripts/" + fileName + ".ino");
    var choregraphies = req.body.choregraphy;

    //If only one choregraphy is sent, it will be contain in an array
    if(!Array.isArray(choregraphies))
        choregraphies = [req.body.choregraphy];

    //We write the "first bloc" of the script (see inoScripts.js)
    fs.writeFileSync(pathScript, inoScripts.arduinoStart(choregraphies), function(err) {
        if(err) return next(err);
    });

    //We use the async library to write each choregraphy and each movemement in the right order
    async.forEach(choregraphies, function(choregraphy, callback) {
        Choregraphy.findById(choregraphy)
            .populate('movement')
            .exec(function (err, c) {
                if (err) return next(err);

                //If a wrong choregraphy ID was sent, we return an error
                if(c == null || c == undefined) {
                    callback('Choregraphy not found!');
                    return res.status(404);
                }

                //Each choregraphy has its own function in the arduino script
                fs.appendFileSync(pathScript, "\n\nvoid choregraphy" + count + "(){", function(err) {
                    if(err) return next(err);
                });

                //We send each movement to inoScripts.js 
                for(var j = 0; j < c.movement.length; j++) {
                    fs.appendFileSync(pathScript, '\n\n' + inoScripts.arduinoMovement(c.movement[j]), function(err) {
                        if(err) next(err);
                    });
                }

                //We close the choregraphy function
                fs.appendFileSync(pathScript, "\n}\n", function(err) {
                    if(err) return next(err);
                });

                count++;

                callback();
            });
    }, function (err) {
        if(err) return next(err);
        //We download the script
        res.download(pathScript);

        //And remove it after 20sec
        setTimeout(function() {
            fs.unlink(pathScript);
        }, 20000);
    });
};
