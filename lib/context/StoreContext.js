/**
 * @file StoreContext
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var debug = require('debug')('StoreContext');
var u = require('underscore');

function StoreContext(context) {
    debug('create a new store context');
    this.context = context;
    this.actionHandlerMap = {};
    this.context.dispatcher.register(u.bind(this.invokeActionHandler, this));
}

StoreContext.prototype.invokeActionHandler = function (payload) {
    var action = payload.action;
    var data = payload.payload;

    debug('invoking action %s', action);

    var handlers = this.actionHandlerMap[action];
    if (!handlers) {
        debug('no handlers for %s', action);
        return;
    }

    debug('%d handlers will be invoke', handlers.length);

    for (var i = 0, len = handlers.length; i < len; ++i) {
        handlers[i](data, action);
    }

    debug('action %s\'s payload synced to all the stores', action);

};

StoreContext.prototype.registerActionHandler = function (actionName, handler) {
    debug('new action handler registed');
    var handlers = this.actionHandlerMap[actionName];
    if (!handlers) {
        handlers = this.actionHandlerMap[actionName] = [];
    }
    handlers.push(handler);
};

module.exports = StoreContext;
