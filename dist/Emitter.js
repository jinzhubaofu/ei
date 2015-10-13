define('ei/Emitter', [
    'require',
    'exports',
    'module',
    'underscore'
], function (require, exports, module) {
    var EMITTER_LISTENER_POOL_ATTR = '__listeners__';
    var EMITTER_CURRENT_EVENT_ATTR = '__event__';
    var u = require('underscore');
    function Emitter() {
    }
    var mixins = {
        on: function on(name, handler) {
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
        off: function off(name, handler) {
            var pool = this[EMITTER_LISTENER_POOL_ATTR];
            if (!pool) {
                return this;
            }
            if (!name) {
                return this.destroyEvents();
            }
            var listeners = pool[name];
            if (!listeners || !listeners.length) {
                return this;
            }
            if (!handler) {
                listeners.length = 0;
                pool[name] = [];
                return this;
            }
            for (var i = listeners.length - 1; i >= 0; --i) {
                if (listeners[i] === handler) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
            return this;
        },
        once: function once(name, handler) {
            var me = this;
            var onceHandler = function onceHandler() {
                me.off(name, onceHandler);
                return handler.apply(me, arguments);
            };
            me.on(name, onceHandler);
            return this;
        },
        emit: function emit(name) {
            var pool = this[EMITTER_LISTENER_POOL_ATTR];
            if (!pool) {
                return this;
            }
            var listeners = [].concat(pool[name] || [], pool['*'] || []);
            if (!listeners.length) {
                return this;
            }
            this[EMITTER_CURRENT_EVENT_ATTR] = name;
            for (var i = 0, len = listeners.length; i < len; ++i) {
                listeners[i].apply(this, u.toArray(arguments).slice(1));
            }
            this[EMITTER_CURRENT_EVENT_ATTR] = null;
            return this;
        },
        getCurrentEvent: function getCurrentEvent() {
            return this[EMITTER_CURRENT_EVENT_ATTR];
        },
        destroyEvents: function destroyEvents() {
            var pool = this[EMITTER_LISTENER_POOL_ATTR];
            if (pool) {
                for (var type in pool) {
                    if (pool[type]) {
                        pool[type].length = 0;
                        pool[type] = null;
                    }
                }
                this[EMITTER_LISTENER_POOL_ATTR] = null;
            }
            return this;
        }
    };
    u.extend(Emitter.prototype, mixins);
    Emitter.enable = function (target) {
        if (u.isFunction(target)) {
            target = target.prototype;
        }
        return u.extend(target, mixins);
    };
    module.exports = Emitter;
});