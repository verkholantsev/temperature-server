/** @jsx React.DOM */

/* globals React */

var socket = io();

import Current from './Current';
import All from './All';
import {temperatureActions} from './temperatureActions';

temperatureActions.update(data);

var App = React.createClass({
    render() {
        return (
            <div className='app'>
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
    temperatureActions.update(data);
});
