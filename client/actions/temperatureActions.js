'use strict';

import dispatcher from '../dispatcher/dispatcher';

export var types = {
    update: 'update',
    setCurrentIndex: 'setCurrentIndex'
};

export var actions = {
    update(data) {
        dispatcher.dispatch({
            type: types.update,
            data: data
        });
    },

    setCurrentIndex(index) {
        dispatcher.dispatch({
            type: types.setCurrentIndex,
            index: index
        });
    }
};
