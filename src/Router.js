/**
 * @file Router
 * @author Leon(leon@outlook.com)
 */

/* eslint-disable fecs-prefer-class */

/**
 * 简易的路由器
 *
 * @class
 * @constructor Router
 * @param {Array.<Object>} routes 路由配置
 */
function Router(routes) {
    this.routes = routes || [];
}

/**
 * 对一个请求进行路由
 *
 * @param {!Object} request 请求对象
 * @return {?Object}
 */
Router.prototype.route = function (request) {

    for (let i = this.routes.length - 1; i >= 0; i--) {

        let route = this.routes[i];

        if (route.path === request.pathname) {
            return route;
        }

    }

};

/**
 * 添加路由配置
 *
 * @param {!Object} config 配置
 * @return {module:Route}
 */
Router.prototype.addRoute = function (config) {

    this.routes.push(config);

    return this;

};

module.exports = Router;
