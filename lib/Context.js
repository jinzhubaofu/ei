/**
 * @file Context
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/
var debug = require('debug')('Context');
var u = require('underscore');

var Dispatcher = require('./Dispatcher');

var StoreContext = require('./context/StoreContext');
var ActionContext = require('./context/ActionContext');
var ViewContext = require('./context/ViewContext');


function Context() {
    this.stores = {};
    this.contexts = {};
    this.data = {};
    this.dispatcher = Dispatcher.create();
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

    debug('fetching store %s', Store.type);

    var type = Store.type;
    var store = this.stores[type];

    if (!store) {
        store = this.stores[type] = Store.create();
        store.setContext(this.getStoreContext());
        u.each(store.actionListeners, store.register, store);
    }

    return store;
};

/**
 * 执行一个action
 * @param  {Action} action 操作
 * @return {*}             操作的结果，暂时貌似没啥用
 */
Context.prototype.executeAction = function (action) {
    return action.execute.apply(
        action,
        [this.getActionContext()].concat(u.toArray(arguments).slice(1))
    );
};

/**
 * 初始化此action相关的store
 * @param  {Action} action 操作
 * @return {boolean}
 */
Context.prototype.instantiateDependentStores = function (action) {

    var dependentStores = Dispatcher.findDependentStores(action);

    if (!dependentStores || !dependentStores.length) {
        return false;
    }

    u.each(dependentStores,
        function (Store) {
            debug('instantiating Store %s', Store.type);
            this.getStore(Store);
        },
        this
    );

    return true;
};

/**
 * 将数据同步给Store
 * @param  {string}  action  action标识
 * @param  {*}       payload 数据
 * @return {Promise}
 */
Context.prototype.dispatch = function (action, payload) {

    debug('preparing the store for action dispatch');

    // 这里需要先实例化相关的store，这样action的数据才有地方放
    if (!this.instantiateDependentStores(action)) {
        debug('no related stores register to this action, dispatch stop with no data sync');
        return;
    }

    debug('all related stores are instantiated.');

    debug('starts to dispatching...');

    // 数据同步到store
    this.dispatcher.dispatch({
        action: action,
        payload: payload
    });

    debug('%s is dispatched successfully', action.getId());

    // 同步store后
    // 也许还有事情要做呢。。。
    return '';
};

Context.prototype.pack = function () {
    return u.reduce(
        this.stores,
        function (result, store, type) {
            result[type] = store.pack();
            return result;
        },
        {}
    );
};

module.exports = Context;
