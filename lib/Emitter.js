/**
 * @file Emitter
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var EMITTER_LISTENER_POOL_ATTR = '__listeners__';

var u = require('underscore');

function Emitter() {}

var mixins = {

    on: function (name, handler) {

        var pool = this[EMITTER_LISTENER_POOL_ATTR];

        if (!pool) {
            pool = this[EMITTER_LISTENER_POOL_ATTR] = {};
        }

        var listeners = pool[name];

        if (!listeners) {
            listeners = pool[name] = [];
        }

        listeners.push(handler);

        return this;
    },

    off: function (name, handler) {

        var pool = this[EMITTER_LISTENER_POOL_ATTR];

        if (!pool) {
            return this;
        }

        var listeners = pool[name];

        if (!listeners) {
            return this;
        }

        if (!handler) {
            pool[name] = [];
        }

        for (var i = listeners.length - 1; i >= 0; --i) {
            if (listeners[i] === handler) {
                listeners.splice(i, 1);
                return this;
            }
        }

        return this;
    },

    once: function (name, handler) {
        var me = this;
        var onceHandler = function () {
            me.off(name, onceHandler);
            return handler.apply(me, arguments);
        };
        me.on(name, onceHandler);
    },

    emit: function (name) {

        var pool = this[EMITTER_LISTENER_POOL_ATTR];

        if (!pool) {
            return this;
        }

        var listeners = pool[name];

        if (!listeners || !listeners.length) {
            return this;
        }

        var args = u.toArray(arguments).slice(1);

        listeners = listeners.slice();

        for (var i = 0, len = listeners.length; i < len; ++i) {
            listeners[i].apply(this, args);
        }

    }

};

u.extend(Emitter.prototype, mixins);

Emitter.enable = function (target) {
    if (u.isFunction(target)) {
        target = target.prototype;
    }
    u.extend(target, mixins);
};

module.exports = Emitter;
