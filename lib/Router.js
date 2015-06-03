/**
 * @file Router
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var u = require('underscore');
var when = require('when');

function Router(routes) {
    this.routes = routes || [];
}

Router.prototype.route = function (request) {

    var routes = this.routes;

    var path = request.path;

    for (var i = 0, len = routes.length; i < len; ++i) {

        var route = routes[i];

        var matcher = route.path;

        if (u.isString(matcher) && matcher === path
            || u.isRegExp(matcher) && matcher.text(path)
            || u.isFunction(matcher) && matcher(path)
        ) {
            return when(route);
        }

    }

    return when.reject(new Error('no view found'));

};

module.exports = Router;
