/**
 * @file context
 * @author Leon(leon@outlook.com)
 */

const composeMiddleware = require('./util/composeMiddleware');
const invariant = require('./util/invariant');

/**
 * `ei`视图上下文
 *
 * @constructor
 * @param {*} initialState 初始化状态
 * @param {!Function} reducer 裁剪器
 * @param {Array.Function} middlewares 中间件序列
 */
function Context(initialState, reducer, middlewares) {

    invariant(typeof reducer === 'function', 'Context need a reducer');

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

    this.getState = this.getState.bind(this);

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

    if (typeof action === 'function') {
        return action(this.dispatch, this.getState);
    }

    var nextState = this.reduce(this.store, action);

    this.setState(nextState);

    // 这里这么干有几点原因
    // 1: 一定要从0开始遍历、回调。这是因为 listener 的添加顺序是父组件在前，子组件在后。
    // 而我们通知回调（通知有数据更新）也需要从父组件到子组件。子组件可能在父组件处理数据变更后就被卸载掉了，再回调它是没有意义的。
    // 2: 一定要对 listener 的存在性做确认。这是为了解决上边提到的情况，父组件数据变更后卸载了子组件；
    // 子组件的数据变更侦听函数实际上已经被移除了。此时不应该再触发它的执行。
    for (var listeners = this.listeners.slice(), i = 0, len = listeners.length; i < len; ++i) {
        var listener = listeners[i];
        if (this.listeners.indexOf(listener) !== -1) {
            listener();
        }
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
