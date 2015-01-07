/** @jsx React.DOM */

/* globals React */
'use strict';

import temperatureStore from '../stores/temperatureStore';

function getState() {
    return {data: temperatureStore.getCurrent()};
}

var Current = React.createClass({
    componentDidMount() {
        temperatureStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        temperatureStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState(getState());
    },

    getInitialState() {
        return getState();
    },

    render() {
        var cols = {
            voltage: 'V',
            resistance: 'Ω',
            temperature: '°C'
        };
        cols = Object.keys(cols).map((key) => {
            return (
                <div className='current__value col col_count_3'>
                    <span>{this.state.data[key]}</span>
                    <span>{cols[key]}</span>
                </div>
            );
        });

        return (
            <div className='current grid'>
                {cols}
            </div>
        );
    }
});

export default Current;
