/**
 * @file Dispatcher
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

exports.Dispatcher = require('flux').Dispatcher;

var u = require('underscore');
var STORE_ACTION_DEPEDENCE_MAP = {};

exports.registerDependentStore = function (actionName, Store) {
    var stores = STORE_ACTION_DEPEDENCE_MAP[actionName];
    if (!stores) {
        stores = STORE_ACTION_DEPEDENCE_MAP[actionName] = [];
    }
    stores.push(Store);
};

exports.unregisterDependentStore = function (actionName, Store) {
    var stores = STORE_ACTION_DEPEDENCE_MAP[actionName];
    if (stores) {
        STORE_ACTION_DEPEDENCE_MAP[actionName] = u.without(stores, Store);
    }
};

exports.findDependentStores = function (actionName) {
    var stores = STORE_ACTION_DEPEDENCE_MAP[actionName];
    return stores;
};
