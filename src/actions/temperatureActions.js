'use strict';

import dispatcher from '../dispatcher/dispatcher';

export var types = {
    update: 'update'
};

export var actions = {
    update(data) {
        dispatcher.dispatch({
            type: types.update,
            data: data
        });
    }
};
