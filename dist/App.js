define('ei/App', [
    'exports',
    './babelHelpers',
    'es6-promise',
    'underscore',
    './util/invariant',
    './locator',
    './events',
    './Router',
    './env',
    './url'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var Promise = require('es6-promise').Promise;
    var u = require('underscore');
    var invariant = require('./util/invariant');
    var locator = require('./locator');
    var events = require('./events');
    var Router = require('./Router');
    var env = require('./env');
    var url = require('./url');
    function App(options) {
        invariant(options, 'App need options');
        invariant(options.routes, 'App need routes');
        u.extend(this, options);
        this.router = new Router(this.routes);
    }
    App.prototype.bootstrap = function (initialState) {
        invariant(env.isClient, 'app-should bootstrap on client only');
        events.emit('app-bootstrap');
        locator.start().on('redirect', u.bind(this.onLocatorRedirect, this));
        var me = this;
        var request = url.parse(location.href);
        var route = this.route(request);
        return route ? me.loadPage(route.page).then(function (Page) {
            var page = me.page = new Page(initialState);
            page.render(document.getElementById(me.main));
            events.emit('app-ready');
        }) : Promise.reject({ status: 404 });
    };
    App.prototype.onLocatorRedirect = function (path, query) {
        var request = {
            path: path,
            query: query
        };
        var me = this;
        return me.execute(request).then(function (result) {
            if (me.page) {
                me.page.dispose();
            }
            var page = me.page = result.page;
            page.render(document.getElementById(me.main));
            events.emit('app-page-switch-succeed');
        });
    };
    App.prototype.execute = function (request) {
        events.emit('app-request');
        var route = this.route(request);
        if (!route) {
            return Promise.reject({ status: 404 });
        }
        var page;
        return this.loadPage(route.page).then(function (Page) {
            page = new Page();
            return page.getInitialState(request);
        }).then(function (state) {
            if (env.isServer && request.xhr) {
                events.emit('app-response-in-json');
                return {
                    state: state,
                    route: route
                };
            }
            events.emit('app-response-in-html');
            events.emit('app-page-bootstrap');
            page.init(state);
            events.emit('app-page-bootstrap-succeed');
            return {
                page: page,
                route: route
            };
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
        var pool = this.pool;
        if (pool && pool[page]) {
            events.emit('app-page-loaded');
            return Promise.resolve(pool[page]);
        }
        return env.isServer ? this.resolveServerModule(page) : this.resolveClientModule(page);
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
            events.emit('app-route-failed');
        }
        return config;
    };
    module.exports = App;
});