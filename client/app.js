'use strict';

/* globals io, data, document */

var socket = io();

import React from 'react';
import {actions as temperatureActions} from './actions/temperatureActions';
import App from './components/App';

temperatureActions.update(data);

React.render(
    <App/>,
    document.body
);

socket.on('data', function (data) {
    temperatureActions.update(data);
});
