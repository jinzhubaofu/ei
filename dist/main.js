define('ei/main', [
    'require',
    'exports',
    'module',
    './App',
    './Page',
    './Container',
    './events',
    './resource',
    './util/composeReducer',
    './util/connect',
    './actionCreator/page'
], function (require, exports, module) {
    exports.App = require('./App');
    exports.Page = require('./Page');
    exports.Container = require('./Container');
    exports.events = require('./events');
    exports.resource = require('./resource');
    exports.composeReducer = require('./util/composeReducer');
    exports.connect = require('./util/connect');
    exports.actions = { INIT: require('./actionCreator/page').INIT };
});