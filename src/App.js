/**
 * @file App
 * @author Leon(leon@outlook.com)
 */

import invariant from './util/invariant';
import events from './events';
import Router from './Router';
import * as env from './env';
import assign from './util/assign';
import createAppComponent from './util/createAppComponent';

/* eslint-disable fecs-prefer-class */

/**
 * App
 *
 * @constructor
 * @param {!Object} options 参数
 * @param {Array.Object} options.routes 路由配置
 */
export default class App {

    static Component = createAppComponent(App);

    constructor(options = {}) {

        invariant(options, 'App need options');
        invariant(options.routes || options.router, 'App need routes/router');

        assign(this, options);

        /**
         * 路由器
         *
         * @member {module:Router}
         */
        this.router = this.router || new Router(this.routes);
    }

    /**
     * 处理一个请求
     *
     * @param {!Object}  request      请求
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
    execute(request, needRawState) {

        invariant(env.isServer, 'App.execute() must run on server');

        /**
         * @event module:events~app-request
         */
        events.emit('app-request');

        const route = this.route(request);

        if (!route) {
            return Promise.reject({
                status: 404
            });
        }

        return this

            // 加载页面模块
            .loadPage(route.page)

            // 加载初始化数据
            .then(Page => {

                const page = new Page();

                return Promise
                    // 这里一定要用 Promise 包裹一下，这个接口可以返回 Promise 或者是 *
                    .resolve(page.getInitialState(request))
                    .then(state => {

                        if (needRawState) {

                            /**
                             * @event module:events~app-response-in-json
                             */
                            events.emit('app-response-in-json');

                            return {
                                state,
                                route
                            };

                        }

                        /**
                         * @event module:events~app-response-in-html
                         */
                        events.emit('app-response-in-html');

                        // 触发 page 的初始归并
                        page.init(state);

                        /**
                         * @event module:events~app-page-bootstrap
                         */
                        events.emit('app-page-bootstrap');

                        /**
                         * @event module:events~app-page-bootstrap
                         */
                        events.emit('app-page-entered');

                        return {
                            page,
                            route
                        };

                    });

            })
            .catch(function (error) {
                events.emit('app-execute-error', error);
                throw error;
            });

    }

    /**
     * 根目录路径
     *
     * @public
     *
     * @param {!string} basePath 根目录路径
     *
     * @return {module:App}
     */
    setBasePath(basePath) {
        this.basePath = basePath;
        return this;
    }

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
    loadPage(page) {

        if (typeof page === 'function') {
            return Promise.resolve(page);
        }

        const pool = this.pool;

        if (pool && pool[page]) {

            /**
             * @event module:events~app-page-loaded
             */
            events.emit('app-page-loaded');

            return Promise.resolve(pool[page]);
        }

        const loadMethodName = env.isServer ? 'resolveServerModule' : 'resolveClientModule';

        return this[loadMethodName](page).then(Page => this.resolvePage(Page));

    }

    /**
     * 解析 Page 类
     *
     * @protected
     *
     * @param {Object|Function} Page 页面模块
     *
     * @return {Promise}
     */
    resolvePage(Page) {

        // @hack
        // 这种是 commonjs/amd 直接返回的 Page
        if (typeof Page === 'function') {
            return Page;
        }

        // 这种是 export default 输出的
        return Page.default;

    }

    /**
     * 服务器端加载Page模块
     *
     * @private
     *
     * @param {string} moduleId Page模块id
     *
     * @return {Promise}
     */
    resolveServerModule(moduleId) {

        /**
         * @event module:events~app-load-page-on-server
         */
        events.emit('app-load-page-on-server', moduleId);

        const basePath = this.basePath;

        invariant(basePath, 'ei need a basePath to resolve your page');

        const path = basePath + '/' + moduleId;

        return new Promise((resolve, reject) => {

            try {

                /* eslint-disable */
                const Page = require(path);
                /* eslint-enable */

                let pool = this.pool;

                if (!pool) {
                    pool = this.pool = {};
                }

                pool[moduleId] = Page;

                resolve(Page);
            }
            catch (e) {
                reject(e);
            }

        });

    }

    /**
     * 在客户端上加载Page模块
     *
     * @private
     *
     * @param {string} moduleId Page模块id
     *
     * @return {Promise}
     */
    resolveClientModule(moduleId) {

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

    }

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
    route(request) {

        /**
         * @event module:events~app-route
         */
        events.emit('app-route');

        const config = this.router.route(request);

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

    }
}
