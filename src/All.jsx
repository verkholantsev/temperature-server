/** @jsx React.DOM */

/* globals React */
'use strict';

import temperature from './temperature';

function getState() {
    return {data: temperature.getAll()};
}

var All = React.createClass({
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
        var bars = this.state.data.map((element) => {
            var style = {
                height: element.barHeight * 100,
                backgroundColor: `rgba(0, 0, 0, ${element.barHeight} )`
            };

            return (
                <div className='all__value col col_count_10'>
                    <div className='bar'>
                        <div style={style} className='bar__content'>
                        </div>
                        <div className='bar__data'>
                            <div>{element.voltage}V</div>
                            <div>{element.resistance}Ω</div>
                            <div>{element.temperature}°C</div>
                        </div>
                    </div>
                </div>
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
