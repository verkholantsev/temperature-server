'use strict';

import dispatcher from './dispatcher';

export var temperatureActions = {
    update(data) {
        dispatcher.dispatch({
            action: 'update',
            data: data
        });
    }
};
