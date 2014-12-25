'use strict';

var jade = require('jade');

module.exports = function (connection) {
    return function (req, res) {
        connection.query('SELECT * FROM data ORDER BY timestamp DESC LIMIT 100', function (err, result) {
            if (err) {
                return process.stderr.write(err + '\n');
            }

            var temperatures = result.map(function (element) {
                return element.temperature;
            });

            var maxTemperature = Math.max.apply(Math, temperatures);
            var minTemperature = Math.min.apply(Math, temperatures);

            var data = result.map(function (element) {
                return {
                    temperature: element.temperature,
                    voltage: element.voltage,
                    resistance: element.resistance,
                    barHeight: (element.temperature - minTemperature) / (maxTemperature - minTemperature)
                };
            });

            res.end(jade.renderFile(
                './templates/index.jade',
                {
                    data: data,
                    current: data[0]
                }
            ));
        });
    };
};
