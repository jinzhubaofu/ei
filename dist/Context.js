define('ei/Context', [
    'exports',
    './babelHelpers',
    'underscore',
    './util/composeMiddleware',
    './util/invariant'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var u = require('underscore');
    var composeMiddleware = require('./util/composeMiddleware');
    var invariant = require('./util/invariant');
    function Context(initialState, reducer, middlewares) {
        invariant(u.isFunction(reducer), 'Context need a reducer');
        this.reducer = reducer;
        this.store = initialState == null ? {} : initialState;
        this.dispatch = composeMiddleware(this, middlewares);
        this.getState = u.bind(this.getState, this);
        this.listeners = [];
    }
    Context.prototype.reduce = function (state, action) {
        return this.reducer(state, action);
    };
    Context.prototype.getState = function () {
        return this.store;
    };
    Context.prototype.setState = function (store) {
        this.store = store;
        return this;
    };
    Context.prototype.dispatch = function (action) {
        if (u.isFunction(action)) {
            return action(this.dispatch, this.getState);
        }
        var nextState = this.reduce(this.store, action);
        this.setState(nextState);
        for (var listeners = this.listeners.slice(), i = 0, len = listeners.length; i < len; ++i) {
            listeners[i]();
        }
        return action;
    };
    Context.prototype.addChangeListener = function (handler) {
        this.listeners.push(handler);
        return this;
    }, Context.prototype.removeChangeListener = function (handler) {
        for (var listeners = this.listeners, i = listeners.length - 1; i >= 0; --i) {
            if (listeners[i] === handler) {
                listeners.splice(i, 1);
                return this;
            }
        }
        return this;
    };
    module.exports = Context;
});