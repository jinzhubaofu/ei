define('ei/util/composeMiddleware', [
    'require',
    'exports',
    'module',
    'underscore'
], function (require, exports, module) {
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