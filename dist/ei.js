define('ei/util/invariant', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    var invariant = function (condition, format, a, b, c, d, e, f) {
        if (condition) {
            return;
        }
        if (!format) {
            throw new Error('' + 'Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        }
        var args = [
            a,
            b,
            c,
            d,
            e,
            f
        ];
        var argIndex = 0;
        var message = '' + 'Invariant Violation: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
        });
        throw new Error(message);
    };
    module.exports = invariant;
});
define('ei/Emitter', [
    'require',
    'exports',
    'module',
    'underscore'
], function (require, exports, module) {
    var EMITTER_LISTENER_POOL_ATTR = '__listeners__';
    var EMITTER_CURRENT_EVENT_ATTR = '__event__';
    var u = require('underscore');
    function Emitter() {
    }
    var mixins = {
        on: function (name, handler) {
            var pool = this[EMITTER_LISTENER_POOL_ATTR];
            if (!pool) {
                pool = this[EMITTER_LISTENER_POOL_ATTR] = {};
            }
            var listeners = pool[name];
            if (!listeners) {
                listeners = pool[name] = [];
            }
            listeners.push(handler);
            return this;
        },
        off: function (name, handler) {
            var pool = this[EMITTER_LISTENER_POOL_ATTR];
            if (!pool) {
                return this;
            }
            if (!name) {
                return this.destroyEvents();
            }
            var listeners = pool[name];
            if (!listeners || !listeners.length) {
                return this;
            }
            if (!handler) {
                listeners.length = 0;
                pool[name] = [];
                return this;
            }
            for (var i = listeners.length - 1; i >= 0; --i) {
                if (listeners[i] === handler) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
            return this;
        },
        once: function (name, handler) {
            var me = this;
            var onceHandler = function () {
                me.off(name, onceHandler);
                return handler.apply(me, arguments);
            };
            me.on(name, onceHandler);
            return this;
        },
        emit: function (name) {
            var pool = this[EMITTER_LISTENER_POOL_ATTR];
            if (!pool) {
                return this;
            }
            var listeners = [].concat(pool[name] || [], pool['*'] || []);
            if (!listeners.length) {
                return this;
            }
            this[EMITTER_CURRENT_EVENT_ATTR] = name;
            for (var i = 0, len = listeners.length; i < len; ++i) {
                listeners[i].apply(this, u.toArray(arguments).slice(1));
            }
            this[EMITTER_CURRENT_EVENT_ATTR] = null;
            return this;
        },
        getCurrentEvent: function () {
            return this[EMITTER_CURRENT_EVENT_ATTR];
        },
        destroyEvents: function () {
            var pool = this[EMITTER_LISTENER_POOL_ATTR];
            if (pool) {
                for (var type in pool) {
                    if (pool[type]) {
                        pool[type].length = 0;
                        pool[type] = null;
                    }
                }
                this[EMITTER_LISTENER_POOL_ATTR] = null;
            }
            return this;
        }
    };
    u.extend(Emitter.prototype, mixins);
    Emitter.enable = function (target) {
        if (u.isFunction(target)) {
            target = target.prototype;
        }
        return u.extend(target, mixins);
    };
    module.exports = Emitter;
});
define('ei/events', [
    'require',
    'exports',
    'module',
    './Emitter'
], function (require, exports, module) {
    var Emitter = require('./Emitter');
    var events = {};
    module.exports = Emitter.enable(events);
});
define('ei/env', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    try {
        exports.isServer = 'object' === typeof process && Object.prototype.toString.call(process) === '[object process]';
    } catch (e) {
    }
    exports.isClient = !exports.isServer;
});
define('ei/url', [
    'require',
    'exports',
    'module',
    'underscore'
], function (require, exports, module) {
    var u = require('underscore');
    var parts = [
        {
            delimiter: '#',
            name: 'hash'
        },
        {
            delimiter: '?',
            name: 'search'
        },
        {
            name: 'path',
            delimiter: '/'
        },
        {
            delimiter: ':',
            name: 'port'
        }
    ];
    function parseQuery(search) {
        var query = {};
        if (!search) {
            return query;
        }
        return u.reduce(search.slice(1).split('&'), function (result, term) {
            var index = term.indexOf('=');
            var name;
            var value;
            if (~index) {
                name = term.slice(0, index);
                value = term.slice(index + 1);
            } else {
                name = term;
                value = '';
            }
            var currentValue = result[name];
            switch (typeof currentValue) {
            case 'string':
                result[name] = [
                    currentValue,
                    value
                ];
                break;
            case 'object':
                result[name].push(value);
                break;
            default:
                result[name] = value;
            }
            return result;
        }, query);
    }
    exports.parse = function (url) {
        var result = {};
        var protocalIndex = url.indexOf('://');
        if (~protocalIndex) {
            result.protocal = url.slice(0, protocalIndex);
            url = url.slice(protocalIndex + 3);
        }
        for (var i = 0, len = parts.length; i < len; ++i) {
            var part = parts[i];
            var index = url.indexOf(part.delimiter);
            if (~index) {
                result[part.name] = url.slice(index);
                url = url.slice(0, index);
            }
        }
        if (result.port) {
            result.port = +result.port.slice(1);
        }
        if (url) {
            result.host = url;
        }
        result.query = parseQuery(result.search);
        return result;
    };
    exports.makeUrl = function (path, query) {
        return '' + path + '?' + u.map(query, function (key, name) {
            return encodeURIComponent(name) + '=' + encodeURIComponent(key);
        }).join('&');
    };
});
define('ei/locator', [
    'require',
    'exports',
    'module',
    './events',
    './env',
    './Emitter',
    './util/invariant',
    './url'
], function (require, exports, module) {
    var events = require('./events');
    var env = require('./env');
    var Emitter = require('./Emitter');
    var invariant = require('./util/invariant');
    var url = require('./url');
    function isHistorySupported() {
        return !!window.history;
    }
    var locator = {
        start: function () {
            window.onpopstate = onHistoryChange;
            return this;
        },
        stop: function () {
            window.onpopstate = null;
            return this;
        },
        redirect: function (path, query) {
            invariant(env.isClient, 'redirect cannot run on server');
            var uri = url.makeUrl(path, query);
            if (isHistorySupported()) {
                events.emit('locator.redirect');
                history.pushState(null, window.title, uri);
                this.emit('redirect', path, query);
                return true;
            }
            return false;
        }
    };
    function onHistoryChange(e) {
        var uri = url.parse(location.href);
        locator.emit('redirect', uri.path, uri.query);
    }
    module.exports = Emitter.enable(locator);
});
define('ei/Router', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    function Router(routes) {
        this.routes = routes || [];
    }
    Router.prototype.route = function (request) {
        for (var i = this.routes.length - 1; i >= 0; i--) {
            var route = this.routes[i];
            if (route.path === request.path) {
                return route;
            }
        }
    };
    Router.prototype.addRoute = function (config) {
        this.routes.push(config);
        return this;
    };
    module.exports = Router;
});
define('ei/App', [
    'require',
    'exports',
    'module',
    'es6-promise',
    'underscore',
    './util/invariant',
    './locator',
    './events',
    './Router',
    './env',
    './url'
], function (require, exports, module) {
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
define('ei/component/ConextProvider', [
    'require',
    'exports',
    'module',
    'react'
], function (require, exports, module) {
    var React = require('react');
    var ContextProvider = React.createClass({
        childContextTypes: { ei: React.PropTypes.object.isRequired },
        propTypes: { ei: React.PropTypes.object.isRequired },
        getChildContext: function () {
            return { ei: this.props.ei };
        },
        render: function () {
            var ei = this.props.ei;
            return this.props.children(ei.store, ei.dispatch);
        }
    });
    module.exports = ContextProvider;
});
define('ei/Context', [
    'require',
    'exports',
    'module',
    'underscore',
    './util/invariant'
], function (require, exports, module) {
    var u = require('underscore');
    var invariant = require('./util/invariant');
    function Context(initialState, reducer) {
        invariant(u.isFunction(reducer), 'Context need a reducer');
        this.reducer = reducer;
        this.store = initialState == null ? {} : initialState;
        this.dispatch = u.bind(this.dispatch, this);
        this.getState = u.bind(this.getState, this);
        this.listeners = [];
    }
    Context.prototype.reduce = function (state, action) {
        return this.reducer(state, action);
    };
    Context.prototype.getState = function () {
        return this.store;
    };
    Context.prototype.setState = function (store) {
        this.store = store;
        return this;
    };
    Context.prototype.dispatch = function (action) {
        if (u.isFunction(action)) {
            return action(this.dispatch, this.getState);
        }
        var nextState = this.reduce(this.store, action);
        this.setState(nextState);
        for (var listeners = this.listeners.slice(), i = 0, len = listeners.length; i < len; ++i) {
            listeners[i]();
        }
        return action;
    };
    Context.prototype.addChangeListener = function (handler) {
        this.listeners.push(handler);
        return this;
    }, Context.prototype.removeChangeListener = function (handler) {
        for (var listeners = this.listeners, i = listeners.length - 1; i >= 0; --i) {
            if (listeners[i] === handler) {
                listeners.splice(i, 1);
                return this;
            }
        }
        return this;
    };
    module.exports = Context;
});
define('ei/util/composeReducer', [
    'require',
    'exports',
    'module',
    'underscore'
], function (require, exports, module) {
    var u = require('underscore');
    function composeReducer(reducers) {
        if (u.isFunction(reducers)) {
            return reducers;
        }
        reducers = u.reduce(u.toArray(arguments), function (finalReducer, reducer) {
            return u.extendOwn(finalReducer, reducer);
        }, {});
        return function (state, action) {
            var isChanged = false;
            var nextState = {};
            for (var name in state) {
                if (!u.has(state, name)) {
                    continue;
                }
                if (u.has(reducers, name)) {
                    var value = state[name];
                    var nextValue = nextState[name] = reducers[name](value, action);
                    if (nextValue !== value) {
                        isChanged = true;
                    }
                } else {
                    nextState[name] = state[name];
                }
            }
            return isChanged ? nextState : state;
        };
    }
    module.exports = composeReducer;
});
define('ei/Page', [
    'require',
    'exports',
    'module',
    'underscore',
    'react',
    './component/ConextProvider',
    './Context',
    './util/composeReducer',
    './util/invariant',
    './events'
], function (require, exports, module) {
    var u = require('underscore');
    var React = require('react');
    var ContextProvider = require('./component/ConextProvider');
    var Context = require('./Context');
    var componseReducer = require('./util/composeReducer');
    var invariant = require('./util/invariant');
    var events = require('./events');
    function Page(initialState) {
        this.context = new Context(initialState, componseReducer(this.reducer));
    }
    var PagePrototype = {
        init: function (initialState) {
            this.dispatch({
                type: 'init',
                data: initialState
            });
            return this;
        },
        createElement: function () {
            var view = this.view;
            return React.createElement(ContextProvider, { ei: this.context }, function () {
                return React.createElement(view);
            });
        },
        render: function (target) {
            React.render(this.createElement(), target);
            return this;
        },
        renderToString: function () {
            return React.renderToString(this.createElement());
        },
        getState: function () {
            return this.context.getState();
        },
        dispatch: function (action) {
            events.emit('page-dispatch', action);
            this.context.dispatch(action);
            return action;
        },
        getInitialState: function (request) {
            return {};
        },
        dispose: function () {
            events.emit('page-dispose');
            return this;
        }
    };
    Page.extend = function (proto) {
        invariant(proto, 'create Page need options');
        invariant(proto.reducer, 'Pager must have a reducer');
        invariant(proto.view, 'Pager must have a view');
        function SubPage(initialState) {
            Page.call(this, initialState);
        }
        u.extend(SubPage.prototype, PagePrototype, proto);
        return SubPage;
    };
    module.exports = Page;
});
define('ei/Container', [
    'require',
    'exports',
    'module',
    'underscore'
], function (require, exports, module) {
    var u = require('underscore');
    var Container = function () {
        this.boundCallbacks = {};
        this.singletonCallbacks = {};
        this.instantiatedSingletons = {};
        this.registeredObjects = {};
    };
    Container.prototype.make = function (name) {
        if (this.registeredObjects[name]) {
            return this.registeredObjects[name];
        }
        var args = u.toArray(arguments).slice(1);
        if (this.singletonCallbacks[name]) {
            var instances = this.instantiatedSingletons;
            var instance = instances[name];
            if (!instance) {
                instance = instances[name] = this.singletonCallbacks[name].apply(this, args);
            }
            return instance;
        }
        var boundCallback = this.boundCallbacks[name];
        return boundCallback ? boundCallback.apply(this, args) : null;
    };
    Container.prototype.bind = function (name, factory) {
        this.boundCallbacks[name] = factory;
        return this;
    };
    Container.prototype.singleton = function (name, factory) {
        this.singletonCallbacks[name] = factory;
        return this;
    };
    Container.prototype.register = function (name, object) {
        this.registeredObjects[name] = object;
        return this;
    };
    module.exports = Container;
});
define('ei/resource', [
    'require',
    'exports',
    'module',
    './Container'
], function (require, exports, module) {
    var Container = require('./Container');
    var container = new Container();
    exports.register = function (type, resource) {
        container.register(type, resource);
        return this;
    };
    exports.get = function (type) {
        return container.make(type);
    };
});
define('ei/component/ContextConnector', [
    'require',
    'exports',
    'module',
    'react'
], function (require, exports, module) {
    var React = require('react');
    var ContextConnector = React.createClass({
        displayName: 'ContextConnector',
        contextTypes: { ei: React.PropTypes.object.isRequired },
        propTypes: {
            children: React.PropTypes.func.isRequired,
            select: React.PropTypes.func.isRequired
        },
        getDataFromContext: function () {
            return this.props.select(this.context.ei.store);
        },
        getInitialState: function () {
            return { data: this.getDataFromContext() };
        },
        componentDidMount: function () {
            this.context.ei.addChangeListener(this.onStoreChange);
        },
        componentWillUnmount: function () {
            this.context.ei.removeChangeListener(this.onStoreChange);
        },
        shouldComponentUpdate: function (nextProps, nextState) {
            return this.state.data !== nextState;
        },
        onStoreChange: function () {
            this.setState({ data: this.getDataFromContext() });
        },
        render: function () {
            return this.props.children(this.state.data, this.context.ei.dispatch);
        }
    });
    module.exports = ContextConnector;
});
define('ei/util/bindActions', [
    'require',
    'exports',
    'module',
    'underscore',
    './invariant'
], function (require, exports, module) {
    var u = require('underscore');
    var invariant = require('./invariant');
    function bindActions(dispatch, actions) {
        invariant(actions, 'need action config');
        invariant(dispatch, 'need dispatch');
        return u.mapObject(actions, function (creator, methodName) {
            return function () {
                var action = creator.apply(null, arguments);
                invariant(action, 'action creator must return a object/funciton');
                return dispatch(action);
            };
        });
    }
    module.exports = bindActions;
});
define('ei/util/bindSelectors', [
    'require',
    'exports',
    'module',
    'underscore',
    './invariant'
], function (require, exports, module) {
    var u = require('underscore');
    var invariant = require('./invariant');
    function bindSelectors(selectors) {
        return function (store) {
            invariant(store, 'need store');
            switch (typeof selectors) {
            case 'function':
                return selectors(store);
            case 'object':
                return u.chain(selectors).pick(u.isFunction).reduce(function (result, select, name) {
                    result[name] = select(store[name]);
                    return result;
                }, {}).value();
            case 'number':
            case 'string':
                return store[selectors];
            case 'boolean':
                return selectors ? store : {};
            default:
                return {};
            }
        };
    }
    module.exports = bindSelectors;
});
define('ei/util/connect', [
    'require',
    'exports',
    'module',
    'react',
    'underscore',
    '../component/ContextConnector',
    './bindActions',
    './bindSelectors'
], function (require, exports, module) {
    var React = require('react');
    var u = require('underscore');
    var ContextConnector = require('../component/ContextConnector');
    var bindActions = require('./bindActions');
    var bindSelectors = require('./bindSelectors');
    function connect(Component, selector, actions) {
        var ContextFixer = React.createClass({
            displayName: 'ContextFixer',
            select: bindSelectors(selector),
            render: function () {
                var props = this.props;
                return React.createElement(ContextConnector, { select: this.select }, function (state, dispatch) {
                    return React.createElement(Component, u.extendOwn({}, state, props, actions ? bindActions(dispatch, actions) : null));
                });
            }
        });
        return ContextFixer;
    }
    module.exports = connect;
});
define('ei/main', [
    'require',
    'exports',
    'module',
    './App',
    './Page',
    './Container',
    './locator',
    './events',
    './resource',
    './util/composeReducer',
    './util/connect'
], function (require, exports, module) {
    exports.App = require('./App');
    exports.Page = require('./Page');
    exports.Container = require('./Container');
    exports.locator = require('./locator');
    exports.events = require('./events');
    exports.resource = require('./resource');
    exports.composeReducer = require('./util/composeReducer');
    exports.connect = require('./util/connect');
});
/**
 * @file ei
 * @author Leon(leon@outlook.com)
 */

define('ei', ['ei/main'], function (main) {
    return main;
});
