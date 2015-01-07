'use strict';

const CHANGE_EVENT = 'change';

import {EventEmitter} from 'events';
import dispatcher from '../dispatcher/dispatcher';
import {types} from '../actions/temperatureActions';

export default temperatureStore();

function temperatureStore() {
    var _data = [];
    var _index = 0;
    var emitter = new EventEmitter();

    return {
        dispatcherIndex: dispatcher.register(_handle),
        getAll,
        getCurrent,
        addChangeListener,
        removeChangeListener
    };

    function _handle(payload) {
        var type = payload.type;

        if (type === types.update) {
            _data = payload.data;
            _emitChange();
        } else if (type === types.setCurrentIndex) {
            _index = payload.index;
            _emitChange();
        }
    }

    function _emitChange() {
        emitter.emit(CHANGE_EVENT);
    }

    function getAll() {
        return _data;
    }

    function getCurrent() {
        return _data[_index];
    }

    function addChangeListener(callback) {
        return emitter.on(CHANGE_EVENT, callback);
    }

    function removeChangeListener(callback) {
        return emitter.removeListener(CHANGE_EVENT, callback);
    }
}
