define('ei/Router', [
    'exports',
    './babelHelpers'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    function Router(routes) {
        this.routes = routes || [];
    }
    Router.prototype.route = function (request) {
        for (var i = this.routes.length - 1; i >= 0; i--) {
            var route = this.routes[i];
            if (route.path === request.path) {
                return route;
            }
        }
    };
    Router.prototype.addRoute = function (config) {
        this.routes.push(config);
        return this;
    };
    module.exports = Router;
});