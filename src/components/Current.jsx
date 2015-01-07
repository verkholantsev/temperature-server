/** @jsx React.DOM */

/* globals React */
'use strict';

import temperatureStore from '../stores/temperatureStore';
import moment from 'moment';

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
            temperature: '°C',
            timestamp: ''
        };
        cols = Object.keys(cols).map((key) => {
            var value = this.state.data[key];
            if (key === 'timestamp') {
                value = moment(value).format('HH:mm DD.MM.YY');
            }

            return (
                <div className='current__value col col_count_4'>
                    <span>{value}</span>
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
