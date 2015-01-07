'use strict';

module.exports = function (rawData) {
    rawData = Array.isArray(rawData) ? rawData : [rawData];
    var temperatures = rawData.map(function (element) {
        return element.temperature;
    });

    var maxTemperature = Math.max.apply(Math, temperatures);
    var minTemperature = Math.min.apply(Math, temperatures);
    var data = rawData.map(function (element) {
        return {
            temperature: element.temperature,
            voltage: element.voltage,
            resistance: element.resistance,
            timestamp: element.timestamp,
            barHeight: (element.temperature - minTemperature) / (maxTemperature - minTemperature)
        };
    });

    return data;
};
