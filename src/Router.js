/**
 * @file Router
 * @author Leon(leon@outlook.com)
 */

export default class Router {

    /**
     * 简易的路由器
     *
     * @constructor Router
     * @param {Array.<Object>} routes 路由配置
     */
    constructor(routes = []) {
        this.routes = routes;
    }
    /**
     * 对一个请求进行路由
     *
     * @param {!Object} request 请求对象
     * @return {?Object}
     */
    route(request) {
        for (let i = this.routes.length - 1; i >= 0; i--) {
            let route = this.routes[i];
            if (route.path === request.pathname) {
                return route;
            }
        }
    }

    /**
     * 添加路由配置
     *
     * @param {!Object} config 配置
     * @return {module:Route}
     */
    addRoute(config) {
        this.routes.push(config);
        return this;
    }

}
