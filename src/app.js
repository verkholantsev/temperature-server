var socket = io();
var current = require('../templates/current');
var all = require('../templates/all');

socket.on('data', function (data) {
    $('.current').replaceWith(current(data));
    $('.all').replaceWith(all(data));
});
