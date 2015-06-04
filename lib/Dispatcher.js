/**
 * @file Dispatcher
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var Dispatcher = require('flux').Dispatcher;

var u = require('underscore');
var STORE_ACTION_DEPEDENCE_MAP = {};

exports.registerDependentStore = function (action, Store) {
    var id = action.getId();
    var stores = STORE_ACTION_DEPEDENCE_MAP[id];
    if (!stores) {
        stores = STORE_ACTION_DEPEDENCE_MAP[id] = [];
    }
    stores.push(Store);
};

exports.unregisterDependentStore = function (action, Store) {
    var id = action.getId();
    var stores = STORE_ACTION_DEPEDENCE_MAP[id];
    if (stores) {
        STORE_ACTION_DEPEDENCE_MAP[id] = u.without(stores, Store);
    }
};

exports.findDependentStores = function (action) {
    return STORE_ACTION_DEPEDENCE_MAP[action.getId()];
};

exports.create = function () {
    return new Dispatcher();
};
