define('ei/util/composeMiddleware', [
    'exports',
    '../babelHelpers',
    'underscore'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var u = require('underscore');
    function composeMiddleware(context, middlewares) {
        var dispatch = u.bind(context.dispatch, context);
        return middlewares && middlewares.length ? u.reduce(middlewares.reverse(), function (next, middleware, index) {
            return function (action) {
                return middleware(context.getState(), action, next);
            };
        }, dispatch) : dispatch;
    }
    ;
    module.exports = composeMiddleware;
});