/**
 * @file 页面
 * @author Leon(leon@outlook.com)
 *
 * @requires underscore
 * @requires react
 */

var u = require('underscore');
var React = require('react');

var ContextProvider = require('./component/ContextProvider');
var Context = require('./Context');
var componseReducer = require('./util/composeReducer');
var invariant = require('./util/invariant');

var events = require('./events');

/**
 * 页面
 *
 * @constructor
 * @param {*} initialState 初始数据状态
 */
function Page(initialState) {
    this.initialize(initialState);
}

/** @lends Page.prototype */
Page.prototype = {

    constructor: Page,

    /**
     * 构造函数
     *
     * @param {*} initialState 初始数据
     */
    initialize: function (initialState) {

        this.context = new Context(
            initialState,
            componseReducer(this.reducer),
            u.map(
                this.middlewares,
                function (middlewareCreator) {
                    return middlewareCreator(this);
                },
                this
            )
        );

    },

    middlewares: [],

    /**
     * 初始化
     *
     * 此方法只会被调用一次
     *
     * 处理请求的过程中，在页面实例化后，会被调用到此方法
     *
     * 此方法会派发一个init动作，并附带有getInitialState方法所返回的数据
     *
     * init动作提供给页面的初始数据剪裁的时机
     *
     * 但是只有在execute的情况下才会被调用，
     * 我们在bootstrap时传入的initialState是已经是剪裁好的数据
     * 也就是在server端预渲染后向client端同步数据状态的场景
     *
     *
     * @TODO 通过page的stage来保证此动作只能触发一次
     *
     * @public
     * @param {*} initialState 初始状态
     * @return {module:Page}
     */
    init: function (initialState) {

        this.dispatch({
            type: 'INIT',
            payload: initialState
        });

        return this;

    },

    /**
     * 使用当前上下文中的数据，创建一个可提渲染使用的react元素
     *
     * @public
     *
     * @return {ReactElement}
     */
    createElement: function () {

        var view = this.view;

        return React.createElement(
            ContextProvider,
            {
                ei: this.context
            },
            React.createElement(view)
        );

    },

    /**
     * 返回当前上下文中的所有数据
     *
     * 此方法用于将服务器端的页面数据，同步到客户端上
     *
     * @public
     *
     * @return {*}
     */
    getState: function () {
        return this.context.getState();
    },

    /**
     * 设置当前上下文中的所有数据
     *
     * @param {*} state 数据
     * @return {module:Page}
     */
    setState: function (state) {
        this.context.setState(state);
        return this;
    },

    /**
     * 派发一个动作，激活相应的数据剪切和视图更新
     *
     * @public
     *
     * @method module:Page#dispatch
     *
     * @param {(Object | Function)} action 动作
     *
     * @return {Object}
     *
     * @fires module:events~page-dispatch
     */
    dispatch: function (action) {

        /**
         * @event module:events~page-dispatch
         * @param {(Object | Function)} action 动作
         */
        events.emit('page-dispatch', action);

        this.emit('dispatch');

        this.context.dispatch(action);

        return action;

    },

    /**
     * 获取页面初始数据
     *
     * 页面在启动时，一般都会需要通过操作资源来获取数据作为初始数据
     *
     * 并且，这个过程一般还需要使用当前`请求`来完成决策
     *
     * 在app中接收到请求后会加载路由中指定的Page模块，将其实例化后，执行此方法
     *
     * @todo page需要有一个状态标识，new / inited / rendered / disposed
     *
     * @public
     *
     * @param {Object} request 请求
     *
     * @return {Promise}
     */
    getInitialState: function (request) {
        return {};
    },

    /**
     * 销毁页面
     *
     * @return {module:Page}
     */
    dispose: function () {

        /**
         * @event module:event~page-dispose
         */
        events.emit('page-dispose');

        this.emit('dispose');

        // @TODO 补充销毁时的必要处理

        return this;
    }

};

require('./Emitter').enable(Page);

/**
 * 生成Page子类
 *
 * @param {!Object} proto 扩展Page的配置
 * @return {Function}
 */
Page.extend = function (proto) {

    invariant(proto, 'create Page need options');

    invariant(proto.reducer, 'Pager must have a reducer');

    invariant(proto.view, 'Pager must have a view');

    function SubPage(initialState) {
        Page.call(this, initialState);
    }

    u.extend(SubPage.prototype, Page.prototype, proto);

    return SubPage;

};

module.exports = Page;
