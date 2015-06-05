define(require, exports, module) {
/**
 * @file main
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var App = require('./App');

var Store = require('./Store');
var Action = require('./Action');

var ei = function () {
    return new App();
};

ei.mixin = require('./mixin');

ei.createStore = function (proto) {
    return Store.createClass(proto);
};

ei.createAction = function (proto) {
    return Action.create(proto);
};

ei.config = function (options) {

};

ei.React = require('react');

module.exports = ei;

});