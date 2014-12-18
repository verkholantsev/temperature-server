var PORT = process.env.PORT || 8080;

var express = require('express');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'arduino',
    password: '',
    database: 'arduino'
});

connection.connect(function (err) {
    if (err) {
        console.error(err);
    }
});

var jade = require('jade');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/data', function (req, res) {
    res.end();
    connection.query('INSERT INTO data SET ?', {
        voltage: req.body.voltage,
        resistance: req.body.resistance,
        temperature: req.body.temperature
    }, function (err, result) {
        if (err) {
            return console.err(err);
        }

        console.log(result.insertId);
    });
});

app.get('/', function (req, res) {
    connection.query('SELECT * FROM data ORDER BY timestamp DESC LIMIT 100', function (err, result) {
        if (err) {
            return console.error(err);
        }

        var temperatures = result.map(function (element) {
            return element.temperature;
        });

        var maxTemperature = Math.max.apply(Math, temperatures);
        var minTemperature = Math.min.apply(Math, temperatures);
        var delta = maxTemperature - minTemperature;
        var step = delta / 10;

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
});

app.listen(PORT, function () {
    console.log('Server listening at', PORT);
});
