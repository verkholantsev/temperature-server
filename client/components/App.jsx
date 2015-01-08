/** @jsx React.DOM */

'use strict';

import React from 'react';
import Current from './Current';
import All from './All';

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

export default App;
