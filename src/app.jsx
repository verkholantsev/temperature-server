/** @jsx React.DOM */

/* globals React */

var socket = io();
var Current = require('./Current');
var All = require('./All');

var dispatcher = require('./dispatcher');
dispatcher.dispatch({action: 'update', data: data});

var App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <h1>Temperature data</h1>
                <h2>Current</h2>
                <Current/>
                <h2>All data</h2>
                <All/>
            </div>
        );
    }
});

var app = React.render(
    <App/>,
    document.body
);

socket.on('data', function (data) {
    dispatcher.dispatch({action: 'update', data: data});
});
