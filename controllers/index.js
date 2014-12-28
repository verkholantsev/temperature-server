'use strict';

var jade = require('jade');
var data = require('../models/data');

module.exports = function (db) {
    return function (req, res) {
        db.query('SELECT * FROM data ORDER BY timestamp DESC LIMIT 100', function (err, result) {
            if (err) {
                return process.stderr.write(err + '\n');
            }

            res.end(jade.renderFile(
                './templates/index.jade',
                data(result)
            ));
        });
    };
};
