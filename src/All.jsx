/** @jsx React.DOM */

/* globals React */

var temperature = require('./temperature');

function getState() {
    return {data: temperature.getAll()};
}

var All = React.createClass({
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
        var bars = this.state.data.map(function (element) {
            var style = {
                height: element.barHeight * 100,
                backgroundColor: 'rgba(0, 0, 0, ' + element.barHeight + ')'
            };

            return (
                <div className="all__value col col_count_10">
                    <div className="bar">
                        <div style={style} className="bar__content">
                        </div>
                        <div className="bar__data">
                            <div>{element.voltage}V</div>
                            <div>{element.resistance}Ω</div>
                            <div>{element.temperature}°C</div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="all grid">
                {bars}
            </div>
        );
    }
});

module.exports = All;
