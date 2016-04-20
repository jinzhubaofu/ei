define('ei/App', [
    'require',
    'exports',
    'module',
    './util/invariant',
    './events',
    './Router',
    './env',
    './util/assign',
    './util/createAppComponent'
], function (require, exports, module) {
    var invariant = require('./util/invariant');
    var events = require('./events');
    var Router = require('./Router');
    var env = require('./env');
    var assign = require('./util/assign');
    function App() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        invariant(options, 'App need options');
        invariant(options.routes || options.router, 'App need routes/router');
        assign(this, options);
        this.router = this.router || new Router(this.routes);
    }
    App.prototype.execute = function (request, needRawState) {
        invariant(env.isServer, 'App.execute() must run on server');
        events.emit('app-request');
        var route = this.route(request);
        if (!route) {
            return Promise.reject({ status: 404 });
        }
        return this.loadPage(route.page).then(function (Page) {
            var page = new Page();
            return Promise.resolve(page.getInitialState(request)).then(function (state) {
                if (needRawState) {
                    events.emit('app-response-in-json');
                    return {
                        state: state,
                        route: route
                    };
                }
                events.emit('app-response-in-html');
                page.init(state);
                events.emit('app-page-bootstrap');
                events.emit('app-page-entered');
                return {
                    page: page,
                    route: route
                };
            });
        })['catch'](function (error) {
            events.emit('app-execute-error', error);
            throw error;
        });
    };
    App.prototype.setBasePath = function (basePath) {
        this.basePath = basePath;
        return this;
    };
    App.prototype.loadPage = function (page) {
        var _this = this;
        if (typeof page === 'function') {
            return Promise.resolve(page);
        }
        var pool = this.pool;
        if (pool && pool[page]) {
            events.emit('app-page-loaded');
            return Promise.resolve(pool[page]);
        }
        var loadMethodName = env.isServer ? 'resolveServerModule' : 'resolveClientModule';
        return this[loadMethodName](page).then(function (Page) {
            return _this.resolvePage(Page);
        });
    };
    App.prototype.resolvePage = function (Page) {
        if (typeof Page === 'function') {
            return Page;
        }
        return Page['default'];
    };
    App.prototype.resolveServerModule = function (moduleId) {
        events.emit('app-load-page-on-server', moduleId);
        var basePath = this.basePath;
        invariant(basePath, 'ei need a basePath to resolve your page');
        var path = basePath + '/' + moduleId;
        var Page = require(path);
        var pool = this.pool;
        if (!pool) {
            pool = this.pool = {};
        }
        pool[moduleId] = Page;
        return Promise.resolve(Page);
    };
    App.prototype.resolveClientModule = function (moduleId) {
        events.emit('app-load-page-on-client');
        if (!moduleId) {
            return Promise.reject(new Error('need page module id'));
        }
        return new Promise(function (resolve, reject) {
            window.require([moduleId], function (Page) {
                resolve(Page);
            });
        });
    };
    App.prototype.route = function (request) {
        events.emit('app-route');
        var config = this.router.route(request);
        if (config) {
            events.emit('app-route-succeed');
        } else {
            events.emit('app-route-failed', request);
        }
        return config;
    };
    App.Component = require('./util/createAppComponent')(App);
    module.exports = App;
});