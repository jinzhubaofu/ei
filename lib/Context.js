/**
 * @file context
 * @author Leon(leon@outlook.com)
 */

var u = require('underscore');
var composeMiddleware = require('./util/composeMiddleware');
var invariant = require('./util/invariant');

/**
 * `ei`视图上下文
 *
 * @constructor
 * @param {*} initialState 初始化状态
 * @param {!Function} reducer 裁剪器
 */
function Context(initialState, reducer, middlewares) {

    invariant(u.isFunction(reducer), 'Context need a reducer');

    /**
     * 剪裁器
     *
     * @private
     * @member {Function}
     */
    this.reducer = reducer;

    /**
     * 数据仓库
     *
     * @private
     * @member {*}
     */
    this.store = initialState == null ? {} : initialState;

    this.dispatch = composeMiddleware(this, middlewares);

    this.getState = u.bind(this.getState, this);

    /**
     * 数据变化侦听函数
     *
     * @private
     * @member {Array.<Function>}
     */
    this.listeners = [];

}

/**
 * 对当前的数据进行剪裁
 *
 * @public
 * @param  {*}       state 数据状态
 * @param  {!Object} action 动作
 * @return {*} 新的数据状态
 */
Context.prototype.reduce = function (state, action) {
    return this.reducer(state, action);
};

/**
 * 获取当前上下文中的数据
 *
 * @public
 * @return {*}
 */
Context.prototype.getState = function () {
    return this.store;
};

/**
 * 设置当前的数据状态
 *
 * @param {*} store 数据状态
 * @return {module:Context}
 */
Context.prototype.setState = function (store) {
    this.store = store;
    return this;
};


/**
 * 派发动作，激活数据剪裁
 *
 * @public
 * @param {!Object} action 动作
 * @return {Object} 动作
 */
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

/**
 * 添加数据变化侦听器
 *
 * @public
 * @param {!Function} handler 处理函数
 * @return {module:Context}
 */
Context.prototype.addChangeListener = function (handler) {
    this.listeners.push(handler);
    return this;
},

/**
 * 移除数据变化侦听器
 *
 * @param {!Function} handler 处理函数
 * @return {module:Context}
 */
Context.prototype.removeChangeListener = function (handler) {

    for (var listeners = this.listeners, i = listeners.length - 1; i >= 0; --i) {
        if (listeners[i] === handler) {
            listeners.splice(i, 1);
            return this;
        }
    }

    return this;

};

module.exports = Context;
