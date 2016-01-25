define('ei/middleware/pageActionEventProxy', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = function (page) {
        return function pageActionEventProxy(state, action, next) {
            if (typeof action !== 'function') {
                var _event = action.event;
                var type = action.type;
                page.emit(_event || type, action);
            }
            return next(action);
        };
    };
});