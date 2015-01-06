'use strict';

import {Promise} from 'vow';

var dispatcher = function () {
    var _callbacks = [];
    var _promises = [];

    return {
        register,
        dispatch
    };

    function register(callback) {
        _callbacks.push(callback);
        return _callbacks.length - 1;
    }

    function dispatch(payload) {
        var resolves = [];
        var rejects = [];

        _promises = _callbacks.map((_, i) => {
            return new Promise((resolve, reject) => {
                resolves[i] = resolve;
                rejects[i] = reject;
            });
        });

        _callbacks.forEach((callback, i) => {
            Promise.resolve(callback(payload))
                .then(() => {
                    resolves[i](payload);
                }, () => {
                    rejects[i](new Error('Dispatcher callback unsuccessful'));
                });
        });

        _promises = [];
    }
};

export default dispatcher();
