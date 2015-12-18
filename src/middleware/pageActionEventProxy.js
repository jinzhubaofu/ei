/**
 * @file page action event proxy
 * @author leon(ludafa@outlook.com)
 */

function pageActionEventProxy(page, state, action, next) {

    if (typeof action !== 'function') {
        let {event, type} = action;
        page.emit(event || type, action);
    }

    next(action);

}

module.exports = function (page) {
    return pageActionEventProxy.bind(null, page);
};
