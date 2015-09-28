define('ei/main', [
    'exports',
    './babelHelpers',
    './App',
    './Page',
    './Container',
    './locator',
    './events',
    './resource',
    './util/composeReducer',
    './util/connect'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    exports.App = require('./App');
    exports.Page = require('./Page');
    exports.Container = require('./Container');
    exports.locator = require('./locator');
    exports.events = require('./events');
    exports.resource = require('./resource');
    exports.composeReducer = require('./util/composeReducer');
    exports.connect = require('./util/connect');
});