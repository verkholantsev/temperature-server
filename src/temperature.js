'use strict';

var dispatcher = require('./dispatcher');
var EventEmitter = require('events').EventEmitter;

var temperature = function () {
    var _data = [];
    var emitter = new EventEmitter();

    return {
        dispatcherIndex: dispatcher.register(_handle),
        getAll: getAll,
        getCurrent: getCurrent,
        addChangeListener: addChangeListener,
        removeChangeListener: removeChangeListener
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

module.exports = temperature();
