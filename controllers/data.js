'use strict';

var getData = require('../models/data');

module.exports = function (db, io) {
    return function (req, res) {
        res.end();

        var data = {
            voltage: req.body.voltage,
            resistance: req.body.resistance,
            temperature: req.body.temperature
        };

        db.query('INSERT INTO data SET ?', data, function (err, result) {
            if (err) {
                return process.stderr.write(err + '\n');
            }

            db.query('SELECT * FROM data ORDER BY timestamp DESC LIMIT 100', function (err, result) {
                if (err) {
                    return process.stderr.write(err + '\n');
                }

                io.emit('data', getData(result));
            });
        });
    };
};
