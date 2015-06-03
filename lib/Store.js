/**
 * @file Store
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var u = require('underscore');
var EventEmitter = require('eventemitter3');
var Dispatcher = require('./Dispatcher');

var STORE_CLASS_POOL = {};

var STORE_CHANGE_EVENT_NAME = 'STORE_CHANGE';

var mixins = {
    init: function () {
        u.each(this.listeners || {}, this.listenTo, this);
    },
    listenTo: function (actionName, handler) {
        this.context.listenToAction(actionName, handler);
        return this;
    },
    setDispatcher: function (dispatcher) {
        this.dispatcher = dispatcher;
    },
    getDispatcher: function () {
        return this.dispatcher;
    },
    setContext: function (context) {
        this.context = context;
        return this;
    },
    getContext: function () {
        return this.context;
    },
    on: function (handler) {
        this.on(STORE_CHANGE_EVENT_NAME, handler);
    },
    off: function (handler) {
        this.off(STORE_CHANGE_EVENT_NAME, handler);
    },
    trigger: function () {
        this.emit(STORE_CHANGE_EVENT_NAME);
    }
};

function register(type, Store) {
    if (STORE_CLASS_POOL[type]) {
        throw new Error('Store ' + type + ' already exist');
    }
    STORE_CLASS_POOL[type] = Store;
}

exports.createClass = function (proto) {

    if (!u.isObject(proto)) {
        throw new Error('Store configuration must be an object');
    }

    if (!proto.type) {
        throw new Error('Store Class need a type');
    }

    if (!proto.handlers) {
        throw new Error(''
            + 'Store must reigster to any/many actions, '
            + 'please configurate it by `actionListeners`: handler name => action name'
        );
    }

    function Store() {
    }

    var type = proto.type;


    Store.create = function () {
        return new Store();
    };

    Store.registerActions = u.partial(registerActionDependence, Store);
    Store.unregisterActions = u.partial(unregisterActions, Store);

    u.extend(
        Store.prototype,
        EventEmitter.prototype,
        mixins,
        proto
    );

    Store.type = type;

    register(type, Store);
    return Store;
};

function registerActionDependence(Store, map) {
    u.each(map, function (actionName) {
        Dispatcher.registerDepedentStore(actionName, Store);
    });
}

function unregisterActionDependence(Store, map) {
    u.each(map, function (actionName) {
        Dispatcher.unregisterDependentStore(actionName, Store);
    });
}

exports.getClass = function (name) {
    return STORE_CLASS_POOL[name];
};
