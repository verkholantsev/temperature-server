/** @jsx React.DOM */

/* globals React */
'use strict';

import {actions as temperatureActions} from '../actions/temperatureActions';

var Bar = React.createClass({
    render() {
        var style = {
            height: this.props.height * 100,
            backgroundColor: `rgba(0, 0, 0, ${this.props.height} )`
        };

        return (
            <div
                className='bar col col_count_10'
                onMouseOver={this._onMouseOver}>
                    <div className='bar__wrapper'>
                        <div style={style} className='bar__content'></div>
                    </div>
            </div>
        );
    },

    _onMouseOver() {
        var index = this.props.index;
        temperatureActions.setCurrentIndex(index);
    },
});

export default Bar;
