/**
 * @file Emitter
 * @author Leon(leon@outlook.com)
 */

var EMITTER_LISTENER_POOL_ATTR = '__listeners__';
var EMITTER_CURRENT_EVENT_ATTR = '__event__';

var u = require('underscore');

/**
 * Emitter
 *
 * @constructor
 */
function Emitter() {}


/** @lends Emitter.prototype */
var mixins = {

    /**
     * 添加事件处理函数
     *
     * @public
     * @param {!string} name 事件名称
     * @param {!Function} handler 事件处理函数
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
     * @public
     * @param {?string} name 事件名称
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
     * @public
     * @param {!string} name 事件类型
     * @param {!Function} handler 事件处理函数
     * @return {module:Emitter}
     */
    once: function (name, handler) {

        var me = this;

        var onceHandler = function () {
            me.off(name, onceHandler);
            return handler.apply(me, arguments);
        };

        me.on(name, onceHandler);

        return this;

    },


    /**
     * 释放事件
     *
     * @public
     * @param {string} name 事件名称
     * @param {...*}   args 事件附带参数
     * @return {module:Emitter}
     */
    emit: function (name) {

        var pool = this[EMITTER_LISTENER_POOL_ATTR];

        // 连pool都没有，那真是一个回调都没有，那么直接返回
        if (!pool) {
            return this;
        }

        // 把*和指定事件类型的事件回调合并在一起
        var listeners = [].concat(pool[name] || [], pool['*'] || []);

        // 如果没有回调函数，那么直接返回
        if (!listeners.length) {
            return this;
        }

        this[EMITTER_CURRENT_EVENT_ATTR] = name;

        for (var i = 0, len = listeners.length; i < len; ++i) {
            listeners[i].apply(
                this,
                u.toArray(arguments).slice(1)
            );
        }

        this[EMITTER_CURRENT_EVENT_ATTR] = null;

        return this;

    },

    /**
     * 获取当前正在派发的事件
     *
     * @public
     * @return {?string}
     */
    getCurrentEvent: function () {
        return this[EMITTER_CURRENT_EVENT_ATTR];
    },

    /**
     * 销毁所有的事件
     *
     * @public
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

/**
 * 激活一个对象，使它获得Emitter的所有技能
 *
 * 如果被激活的对象是一个函数，那么它的实例会拥有Emitter的技能
 *
 * @note 我们在激活一个函数时，会对它的原型对象进行修改
 *
 * @param {!(Object | Function)} target 即将被激活的对象
 * @return {Object}
 */
Emitter.enable = function (target) {

    if (u.isFunction(target)) {
        target = target.prototype;
    }

    return u.extend(target, mixins);

};

module.exports = Emitter;
