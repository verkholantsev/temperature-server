'use strict';

import dispatcher from './dispatcher';
import {EventEmitter} from 'events';

var temperature = function () {
    var _data = [];
    var emitter = new EventEmitter();

    return {
        dispatcherIndex: dispatcher.register(_handle),
        getAll,
        getCurrent,
        addChangeListener,
        removeChangeListener
    };

    function _handle(payload) {
        var action = payload.action;

        if (action === 'update') {
            _data = payload.data;
            _emitChange();
        }
    }

    function _emitChange() {
        emitter.emit('change');
    }

    function getAll() {
        return _data;
    }

    function getCurrent() {
        return _data[0];
    }

    function addChangeListener(callback) {
        return emitter.on('change', callback);
    }

    function removeChangeListener(callback) {
        return emitter.removeListener('change', callback);
    }
};

export default temperature();
