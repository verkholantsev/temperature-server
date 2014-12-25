'use strict';

module.exports = function (connection) {
    return function (req, res) {
        res.end();

        connection.query('INSERT INTO data SET ?', {
            voltage: req.body.voltage,
            resistance: req.body.resistance,
            temperature: req.body.temperature
        }, function (err, result) {
            if (err) {
                return process.stderr.write(err + '\n');
            }
        });
    };
};
