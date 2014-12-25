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

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/data', require('./controllers/data')(connection));
app.get('/', require('./controllers/index')(connection));

app.listen(PORT, function () {
    console.log('Server listening at', PORT);
});
