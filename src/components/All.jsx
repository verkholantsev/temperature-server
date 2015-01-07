/** @jsx React.DOM */

/* globals React */
'use strict';

import temperatureStore from '../stores/temperatureStore';
import Bar from './Bar';

function getState() {
    return {
        data: temperatureStore.getAll(),
        currentIndex: temperatureStore.getIndex()
    };
}

var All = React.createClass({
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
        var bars = this.state.data.map((element, index) => {
            var current = this.state.currentIndex === index;
            return (
                <Bar index={index} current={current} key={index} height={element.barHeight}/>
            );
        });

        return (
            <div className='all grid'>
                {bars}
            </div>
        );
    }
});

export default All;
