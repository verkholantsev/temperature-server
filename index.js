var PORT = process.env.PORT || 8080;
var WORKERS_COUNT = process.env.WORKERS || 4;

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var socketio = require('socket.io');

var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'arduino',
    password: '',
    database: 'arduino'
});

db.connect(function (err) {
    if (err) {
        console.error(err);
    }

    var app = express();

    var server = http.createServer(app);
    var io = socketio(server);

    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.json());

    app.post('/data', require('./controllers/data')(db, io));
    app.get('/', require('./controllers/index')(db));

    var sticky = require('sticky-session');

    sticky(WORKERS_COUNT, server).listen(PORT, function () {
        console.log('[%s] Server listening at %s', process.pid, PORT);
    });

    io.on('connection', function () {
        console.log('[%s] User connected', process.pid);
    });

});

