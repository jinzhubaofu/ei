define(require, exports, module) {
/**
 * @file Store
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var u = require('underscore');
var EventEmitter = require('eventemitter3');
var Dispatcher = require('./Dispatcher');
var debug = require('debug')('Store');
var STORE_CLASS_POOL = {};

var STORE_CHANGE_EVENT_NAME = 'STORE_CHANGE';

var mixins = {
    setContext: function (context) {
        this.context = context;
    },
    register: function (action, handler) {
        if (u.isString(handler)) {
            handler = this[handler];
        }
        handler = u.bind(handler, this);
        this.context.registerActionHandler(action, handler);
    },
    pack: function () {
        throw new Error('Store must implement the pack method');
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

    if (!proto.actionListeners) {
        throw new Error(''
            + 'Store ' + proto.type + ' must reigster to any/many actions, '
            + 'please configurate it by property `actionListeners` on your options'
            + ': handler name => action name'
        );
    }

    function Store() {
    }

    var type = proto.type;

    debug('creating new store class %s', type);

    Store.create = function () {
        debug('create a new store instance');
        return new Store();
    };

    u.extend(
        Store.prototype,
        EventEmitter.prototype,
        mixins,
        proto
    );

    Store.type = type;
    register(type, Store);
    registerActionDependence(Store, proto.actionListeners);
    return Store;
};

function registerActionDependence(Store, map) {
    u.each(map, function (action) {
        debug('%s register handler to %s', Store.type, action.getId());
        Dispatcher.registerDependentStore(action, Store);
    });
}

exports.getClass = function (name) {
    return STORE_CLASS_POOL[name];
};

});