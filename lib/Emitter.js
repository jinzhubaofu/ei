/**
 * @file Emitter
 * @author Leon(leon@outlook.com)
 * @module Emitter
 */


var EMITTER_LISTENER_POOL_ATTR = '__listeners__';

var u = require('underscore');

function Emitter() {}

var mixins = {

    /**
     * 添加事件处理函数
     *
     * @param {string} name 事件名称
     * @param {Function} handler 事件处理函数
     * @return {module:Emitter}
     */
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

    /**
     * 取消事件处理
     *
     * @param {string} name 事件名称
     * @param {?Function} handler 事件处理函数
     * @return {module:Emitter}
     */
    off: function (name, handler) {

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

        // 没有指定移除的回调函数，那么移除所有的
        if (!handler) {
            listeners.length = 0;
            pool[name] = [];
            return this;
        }

        // 找到指定的回调函数，移除它
        for (var i = listeners.length - 1; i >= 0; --i) {
            if (listeners[i] === handler) {
                listeners.splice(i, 1);
                return this;
            }
        }

        return this;
    },

    /**
     * 添加一个只回调一次的事件处理函数
     *
     * @param {string} name 事件类型
     * @param {Function} handler 事件处理函数
     * @return {module:Emitter}
     */
    once: function (name, handler) {
        var me = this;
        var onceHandler = function () {
            me.off(name, onceHandler);
            return handler.apply(me, arguments);
        };
        me.on(name, onceHandler);
    },


    /**
     * 释放事件
     *
     * @param {string} name 事件名称
     * @param {...*}   args 事件附带参数
     * @return {module:Emitter}
     */
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

        return this;

    },

    /**
     * 销毁所有的事件
     *
     * @return {module:Emitter}
     */
    destroyEvents: function () {

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
    u.extend(target, mixins);
};

module.exports = Emitter;
