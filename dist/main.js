define('ei/main', [
    'require',
    'exports',
    'module',
    './App',
    './env',
    './Page',
    './Container',
    './locator',
    './events',
    './resource',
    './util/composeReducer',
    './util/connect'
], function (require, exports, module) {
    var App = require('./App');
    var env = require('./env');
    var app;
    exports.getApp = function (options) {
        if (env.isServer) {
            return new App();
        }
        if (!app) {
            app = new App(options);
        }
        return app;
    };
    exports.App = require('./App');
    exports.Page = require('./Page');
    exports.Container = require('./Container');
    exports.locator = require('./locator');
    exports.events = require('./events');
    exports.resource = require('./resource');
    exports.composeReducer = require('./util/composeReducer');
    exports.connect = require('./util/connect');
});