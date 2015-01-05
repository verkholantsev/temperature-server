/** @jsx React.DOM */

/* globals React */
'use strict';

var temperature = require('./temperature');

function getState() {
    return {data: temperature.getCurrent()};
}

var Current = React.createClass({
    componentDidMount: function () {
        temperature.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        temperature.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(getState());
    },

    getInitialState: function () {
        return getState();
    },

    render: function () {
        var cols = {
            voltage: 'V',
            resistance: 'Ω',
            temperature: '°C'
        };
        cols = Object.keys(cols).map(function (key) {
            return (
                <div className="current__value col col_count_3">
                    <span>{this.state.data[key]}</span>
                    <span>{cols[key]}</span>
                </div>
            );
        }, this);

        return (
            <div className="current grid">
                {cols}
            </div>
        );
    }
});

module.exports = Current;
