define('ei/middleware/pageActionEventProxy', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    function pageActionEventProxy(page, state, action, next) {
        if (typeof action !== 'function') {
            var _event = action.event;
            var type = action.type;
            page.emit(_event || type, action);
        }
        return next(action);
    }
    module.exports = function (page) {
        return pageActionEventProxy.bind(null, page);
    };
});