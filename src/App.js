/**
 * @file App
 * @author Leon(leon@outlook.com)
 */

var Promise = require('es6-promise').Promise;
var u = require('underscore');

var invariant = require('./util/invariant');
var events = require('./events');
var Router = require('./Router');
var env = require('./env');

/**
 * App
 *
 * @constructor
 * @param {!Object} options 参数
 * @param {Array.Object} options.routes 路由配置
 */
function App(options) {

    invariant(options, 'App need options');
    invariant(options.routes, 'App need routes');

    u.extend(this, options);

    /**
     * 路由器
     *
     * @member {module:Router}
     */
    this.router = new Router(this.routes);

}

/**
 * 处理一个请求
 *
 * @param {!Object}  request      请求
 * @param {?*}       initialState 初始数据状态
 * @param {boolean}  needRawState 是否需要未经加工的page数据
 * @return {Promise}
 *
 * @fires module:events~app-request
 * @fires module:events~app-get-initial-state
 * @fires module:events~app-get-initial-state-succeed
 * @fires module:events~app-get-initial-state-failed
 * @fires module:events~app-response-in-json
 * @fires module:events~app-response-in-html
 * @fires module:events~app-page-loaded
 * @fires module:events~app-page-bootstrap
 * @fires module:events~app-page-bootstrap-succeed
 */
App.prototype.execute = function (request, initialState, needRawState) {

    invariant(env.isServer, 'App.execute() must run on server');

    /**
     * @event module:events~app-request
     */
    events.emit('app-request');

    var me = this;

    var route = me.route(request);

    if (!route) {
        return Promise.reject({
            status: 404
        });
    }

    return me

        // 加载页面模块
        .loadPage(route.page)

        // 加载初始化数据
        .then(function (Page) {

            var page = new Page(initialState);

            return Promise
                // 这里一定要用 Promise 包裹一下，这个接口可以返回 Promise 或者是 *
                .resolve(initialState == null ? page.getInitialState(request) : initialState)
                .then(function (state) {

                    if (needRawState) {

                        /**
                         * @event module:events~app-response-in-json
                         */
                        events.emit('app-response-in-json');

                        return {
                            state: state,
                            route: route
                        };

                    }

                    /**
                     * @event module:events~app-response-in-html
                     */
                    events.emit('app-response-in-html');

                    // 如果没有传入initialState，那么我们做一次初始化归并
                    // 如果没有带初始参数，那么我们就不触发init动作了
                    // 因为initialState是脱水出来的store状态，并不需要归并计算
                    if (initialState == null) {

                        // 触发 page 的初始归并
                        page.init(state);

                        /**
                         * @event module:events~app-page-bootstrap
                         */
                        events.emit('app-page-bootstrap');

                    }

                    /**
                     * @event module:events~app-page-bootstrap
                     */
                    events.emit('app-page-entered');

                    return {
                        page: page,
                        route: route
                    };

                });

        })
        ['catch'](function (error) {
            events.emit('app-execute-error', error);
            throw error;
        });

};

/**
 * 根目录路径
 *
 * @public
 *
 * @param {!string} basePath 根目录路径
 *
 * @return {module:App}
 */
App.prototype.setBasePath = function (basePath) {
    this.basePath = basePath;
    return this;
};

/**
 * 加载Page类
 *
 * @protected
 *
 * @param {!string} page 页面模块路径
 *
 * @return {Promise}
 *
 * @fires module:events~app-page-loaded
 * @fires module:events~app-load-page-on-server
 * @fires module:events~app-load-page-on-client
 */
App.prototype.loadPage = function (page) {

    var pool = this.pool;

    if (pool && pool[page]) {

        /**
         * @event module:events~app-page-loaded
         */
        events.emit('app-page-loaded');

        return Promise.resolve(pool[page]);
    }

    return env.isServer ? this.resolveServerModule(page) : this.resolveClientModule(page);

};

/**
 * 服务器端加载Page模块
 *
 * @private
 *
 * @param {string} moduleId Page模块id
 *
 * @return {Promise}
 */
App.prototype.resolveServerModule = function (moduleId) {

    /**
     * @event module:events~app-load-page-on-server
     */
    events.emit('app-load-page-on-server', moduleId);

    var basePath = this.basePath;

    invariant(basePath, 'ei need a basePath to resolve your page');

    var path = basePath + '/' + moduleId;

    var Page = require(path);

    var pool = this.pool;

    if (!pool) {
        pool = this.pool = {};
    }

    pool[moduleId] = Page;

    return Promise.resolve(Page);

};

/**
 * 在客户端上加载Page模块
 *
 * @private
 *
 * @param {string} moduleId Page模块id
 *
 * @return {Promise}
 */
App.prototype.resolveClientModule = function (moduleId) {

    /**
     * @event module:events~app-load-page-on-client
     */
    events.emit('app-load-page-on-client');

    if (!moduleId) {
        return Promise.reject(new Error('need page module id'));
    }

    return new Promise(function (resolve, reject) {

        window.require([moduleId], function (Page) {
            resolve(Page);
        });

    });

};

/**
 * 路由
 *
 * @protected
 *
 * @param {!Object} request 请求
 *
 * @return {?Object}
 *
 * @fires module:events~app-route-succeed
 * @fires module:events~app-route-succeed
 * @fires module:events~app-route-failed
 */
App.prototype.route = function (request) {

    /**
     * @event module:events~app-route
     */
    events.emit('app-route');

    var config = this.router.route(request);

    if (config) {

        /**
         * @event module:events~app-route-succeed
         */
        events.emit('app-route-succeed');

    }
    else {

        /**
         * @event module:events~app-route-failed
         */
        events.emit('app-route-failed', request);
    }

    return config;

};

module.exports = App;
