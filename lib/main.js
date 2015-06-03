/**
 * @file main
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var App = require('./App');

var Store = require('./Store');

var ei = function () {
    return new App();
};

ei.mixin = require('./mixin');


ei.createStore = function (proto) {
    return Store.createClass(proto);
};

module.exports = ei;
