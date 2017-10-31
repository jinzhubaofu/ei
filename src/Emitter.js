/**
 * @file Emitter
 * @author Leon(leon@outlook.com)
 */

const EMITTER_LISTENER_POOL_ATTR = '__listeners__';
const EMITTER_CURRENT_EVENT_ATTR = '__event__';

export default class Emitter {

    /**
     * 添加事件处理函数
     *
     * @public
     * @param {!string} name 事件名称
     * @param {!Function} handler 事件处理函数
     * @return {module:Emitter}
     */
    on(name, handler) {

        let pool = this[EMITTER_LISTENER_POOL_ATTR];

        if (!pool) {
            pool = this[EMITTER_LISTENER_POOL_ATTR] = {};
        }

        let listeners = pool[name];

        if (!listeners) {
            listeners = pool[name] = [];
        }

        listeners.push(handler);

        return this;
    }

    /**
     * 取消事件处理
     *
     * @public
     * @param {?string} name 事件名称
     * @param {?Function} handler 事件处理函数
     * @return {module:Emitter}
     */
    off(name, handler) {

        let pool = this[EMITTER_LISTENER_POOL_ATTR];

        if (!pool) {
            return this;
        }

        if (!name) {
            return this.destroyEvents();
        }

        const listeners = pool[name];

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
        for (let i = listeners.length - 1; i >= 0; --i) {
            if (listeners[i] === handler) {
                listeners.splice(i, 1);
                return this;
            }
        }

        return this;
    }

    /**
     * 添加一个只回调一次的事件处理函数
     *
     * @public
     * @param {!string} name 事件类型
     * @param {!Function} handler 事件处理函数
     * @return {module:Emitter}
     */
    once(name, handler) {

        const me = this;

        function onceHandler(...args) {
            me.off(name, onceHandler);
            return handler.apply(me, args);
        }

        me.on(name, onceHandler);

        return this;

    }


    /**
     * 释放事件
     *
     * @public
     * @param {string} name 事件名称
     * @param {...*}   args 事件附带参数
     * @return {module:Emitter}
     */
    emit(name, ...args) {

        let pool = this[EMITTER_LISTENER_POOL_ATTR];

        // 连pool都没有，那真是一个回调都没有，那么直接返回
        if (!pool) {
            return this;
        }

        // 把*和指定事件类型的事件回调合并在一起
        const listeners = [].concat(pool[name] || [], pool['*'] || []);

        // 如果没有回调函数，那么直接返回
        if (!listeners.length) {
            return this;
        }

        this[EMITTER_CURRENT_EVENT_ATTR] = name;

        for (let i = 0, len = listeners.length; i < len; ++i) {
            listeners[i].apply(this, args);
        }

        this[EMITTER_CURRENT_EVENT_ATTR] = null;

        return this;

    }

    /**
     * 获取当前正在派发的事件
     *
     * @public
     * @return {?string}
     */
    getCurrentEvent() {
        return this[EMITTER_CURRENT_EVENT_ATTR];
    }

    /**
     * 销毁所有的事件
     *
     * @public
     * @return {module:Emitter}
     */
    destroyEvents() {

        const pool = this[EMITTER_LISTENER_POOL_ATTR];

        if (pool) {

            /* eslint-disable fecs-use-for-of */
            for (let type in pool) {
                if (pool[type]) {
                    pool[type].length = 0;
                    pool[type] = null;
                }
            }
            /* eslint-enable fecs-use-for-of */

            this[EMITTER_LISTENER_POOL_ATTR] = null;

        }

        return this;

    }

}
