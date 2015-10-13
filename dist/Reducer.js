define('ei/Reducer', [
    'require',
    'exports',
    'module',
    'underscore',
    './Dispatcher'
], function (require, exports, module) {
    var u = require('underscore');
    var Dispatcher = require('./Dispatcher');
    var mixins = {
        bindAction: function bindAction(ActionCreator) {
            Dispatcher.addActionListener(ActionCreator.type, this);
            return this;
        }
    };
    exports.extend = function (reducer) {
        if (!u.isFunction(reducer)) {
            throw new Error('Reducer have be a function');
        }
        return u.extend(reducer, mixins);
    };
    exports.compose = function (reducers) {
        reducers = u.pick(reducers, u.isFunction);
        return function (state, action) {
            var hasChange = false;
            var nextState = {};
            for (var key in reducers) {
                if (u.has(reducers, key)) {
                    var currentValue = nextState[key];
                    var nextValue = reducers[key](currentValue, action);
                    if (currentValue !== nextValue) {
                        nextState[key] = nextValue;
                        hasChange = true;
                    }
                }
            }
            return hasChange ? nextState : state;
        };
    };
});