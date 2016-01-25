/**
 * @file page action event proxy
 * @author leon(ludafa@outlook.com)
 */

module.exports = function (page) {

    return function pageActionEventProxy(state, action, next) {

        if (typeof action !== 'function') {
            let {event, type} = action;
            page.emit(event || type, action);
        }

        return next(action);

    };

};
