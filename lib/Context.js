/**
 * @file Context
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var u = require('underscore');

var Dispatcher = require('./Dispatcher');

var StoreContext = require('./context/StoreContext');
var ActionContext = require('./context/ActionContext');
var ViewContext = require('./context/ViewContext');


function Context() {
    this.dispatcher = new Dispatcher();
    this.stores = {};
    this.contexts = {};
    this.data = {};
}

Context.prototype.set = function (name, value) {
    if (u.isObject(name)) {
        u.extend(this.data, name);
    }
    else {
        this.data[name] = value;
    }
    return this;
};

Context.prototype.get = function (name) {
    return arguments.length > 1
        ? u.pick(this.data, u.toArray(arguments))
        : this.data[name];
};

Context.prototype.getActionContext = function () {
    var actionContext = this.contexts.action;
    if (!actionContext) {
        actionContext = this.contexts.action = new ActionContext(this);
    }
    return actionContext;
};

Context.prototype.getStoreContext = function () {
    var storeContext = this.contexts.store;
    if (!storeContext) {
        storeContext = this.contexts.store = new StoreContext(this);
    }
    return storeContext;
};

Context.prototype.getViewContext = function () {
    var viewContext = this.contexts.view;
    if (!viewContext) {
        viewContext = this.contexts.view = new ViewContext(this);
    }
    return viewContext;
};

Context.prototype.getStore = function (Store) {
    var type = Store.type;
    var store = this.stores[type];
    if (!store) {
        store = this.stores[type] = Store.create().setContext(this.getStoreContext());
        store.init();
    }
    return store;
};

Context.prototype.instantiateDependentStores = function (action) {
    u.each(Dispatcher.findDependentStores(action) || [], this.getStore, this);
};

/**
 * 将数据同步给Store
 * @param  {string}  action  action标识
 * @param  {*}       payload 数据
 * @return {Promise}
 */
Context.prototype.dispatch = function (action, payload) {
    // 这里需要先实例化相关的store，这样action的数据才有地方放
    this.instantiateDependentStores(action);
    // 数据同步到store
    this.dispatcher.dispatch(action, payload);
    // 同步store后
    // 也许还有事情要做呢。。。
    return '';
};

module.exports = Context;
