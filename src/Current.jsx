/** @jsx React.DOM */

/* globals React */
'use strict';

import temperature from './temperature';

function getState() {
    return {data: temperature.getCurrent()};
}

var Current = React.createClass({
    componentDidMount() {
        temperature.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        temperature.removeChangeListener(this._onChange);
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
