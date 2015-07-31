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
var componseReducer = require('./composeReducer');
var invariant = require('./util/invariant');

var events = require('./events');

/**
 * 页面
 *
 * @constructor
 * @param {*} initialState 初始数据状态
 */
function Page(initialState) {

    this.context = new Context(
        initialState,
        componseReducer(this.reducer)
    );

}

/** @lends Page.prototype */
var PagePrototype = {

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
            function () {
                return React.createElement(view);
            }
        );

    },

    /**
     * 使用当前的上下文中的数据，将页面渲染到指定的元素
     *
     * 只能在客户端使用
     *
     * @public
     *
     * @param {Element} target DOM元素
     *
     * @return {module:Page}
     */
    render: function (target) {

        React.render(this.createElement(), target);

        return this;
    },

    /**
     * 使用当前的上下文中的数据，将页面渲染成字符串
     *
     * @public
     *
     * @return {string}
     */
    renderToString: function () {
        return React.renderToString(this.createElement());
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
     * 派发一个动作，激活相应的数据剪切和视图更新
     *
     * @public
     *
     * @method module:Page#dispatch
     *
     * @param {Object} action 动作
     *
     * @return {Object}
     *
     * @fires module:events~page-dispatch
     */
    dispatch: function (action) {

        /**
         * @event module:events~page-dispatch
         * @param {Object} action 动作
         */
        events.emit('page-dispatch', action);

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

        // @TODO 补充销毁时的必要处理

        return this;
    }

};

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

    u.extend(SubPage.prototype, PagePrototype, proto);

    return SubPage;

};

module.exports = Page;
