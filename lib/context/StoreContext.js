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

/**
 * 唤醒store的数据同步
 * @param {*} payload action派发的数据
 */
StoreContext.prototype.invokeActionHandler = function (payload) {
    var action = payload.action;
    var data = payload.payload;
    var id = action.getId();

    debug('invoking action %s', id);

    var handlers = this.actionHandlerMap[id];
    if (!handlers) {
        debug('no handlers for %s', id);
    }

    debug('%d handlers will be invoke', handlers.length);

    for (var i = 0, len = handlers.length; i < len; ++i) {
        handlers[i](data, action);
    }

    debug('action %s\'s payload synced to all the stores', id);

};

/**
 * 注册对action的监视关系
 * @param  {Action}   action  Action对象实例
 * @param  {Function} handler 同步数据操作
 */
StoreContext.prototype.registerActionHandler = function (action, handler) {
    debug('new action handler registed');
    var guid = action.getId();
    var handlers = this.actionHandlerMap[guid];
    if (!handlers) {
        handlers = this.actionHandlerMap[guid] = [];
    }
    handlers.push(handler);
};

module.exports = StoreContext;
