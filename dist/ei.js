define('ei/Router', [
    'require',
    'exports',
    'module',
    'underscore',
    'when'
], function (require, exports, module) {
    var u = require('underscore');
    var when = require('when');
    function Router(routes) {
        this.routes = routes || [];
    }
    Router.prototype.route = function (request) {
        var routes = this.routes;
        var path = request.path;
        for (var i = 0, len = routes.length; i < len; ++i) {
            var route = routes[i];
            var matcher = route.path;
            if (u.isString(matcher) && matcher === path || u.isRegExp(matcher) && matcher.text(path) || u.isFunction(matcher) && matcher(path)) {
                return when(route);
            }
        }
        return when.reject(new Error('no view found'));
    };
    module.exports = Router;
});
define('ei/Dispatcher', [
    'require',
    'exports',
    'module',
    'flux',
    'underscore'
], function (require, exports, module) {
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
});
define('ei/context/StoreContext', [
    'require',
    'exports',
    'module',
    'debug',
    'underscore'
], function (require, exports, module) {
    var debug = require('debug')('StoreContext');
    var u = require('underscore');
    function StoreContext(context) {
        debug('create a new store context');
        this.context = context;
        this.actionHandlerMap = {};
        this.context.dispatcher.register(u.bind(this.invokeActionHandler, this));
    }
    StoreContext.prototype.invokeActionHandler = function (payload) {
        var action = payload.action;
        var data = payload.payload;
        var id = action.getId();
        debug('invoking action %s', id);
        var handlers = this.actionHandlerMap[id];
        if (!handlers) {
            debug('no handlers for %s', id);
        }
        debug('%d handlers will be invoke', handlers.length);
        for (var i = 0, len = handlers.length; i < len; ++i) {
            handlers[i](data, action);
        }
        debug('action %s\'s payload synced to all the stores', id);
    };
    StoreContext.prototype.registerActionHandler = function (action, handler) {
        debug('new action handler registed');
        var guid = action.getId();
        var handlers = this.actionHandlerMap[guid];
        if (!handlers) {
            handlers = this.actionHandlerMap[guid] = [];
        }
        handlers.push(handler);
    };
    module.exports = StoreContext;
});
define('ei/context/ActionContext', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    function ActionContext(context) {
        this.context = context;
    }
    ActionContext.prototype.dispatch = function (action, payload) {
        this.context.dispatch(action, payload);
    };
    module.exports = ActionContext;
});
define('ei/context/ViewContext', [
    'require',
    'exports',
    'module',
    'underscore'
], function (require, exports, module) {
    var u = require('underscore');
    function ViewContext(context) {
        this.getStore = u.bind(context.getStore, context);
        this.executeAction = u.bind(context.executeAction, context);
    }
    module.exports = ViewContext;
});
define('ei/Context', [
    'require',
    'exports',
    'module',
    'debug',
    'underscore',
    './Dispatcher',
    './context/StoreContext',
    './context/ActionContext',
    './context/ViewContext'
], function (require, exports, module) {
    var debug = require('debug')('Context');
    var u = require('underscore');
    var Dispatcher = require('./Dispatcher');
    var StoreContext = require('./context/StoreContext');
    var ActionContext = require('./context/ActionContext');
    var ViewContext = require('./context/ViewContext');
    function Context() {
        this.stores = {};
        this.contexts = {};
        this.data = {};
        this.dispatcher = Dispatcher.create();
    }
    Context.prototype.set = function (name, value) {
        if (u.isObject(name)) {
            u.extend(this.data, name);
        } else {
            this.data[name] = value;
        }
        return this;
    };
    Context.prototype.get = function (name) {
        return arguments.length > 1 ? u.pick(this.data, u.toArray(arguments)) : this.data[name];
    };
    Context.prototype.getActionContext = function () {
        var actionContext = this.contexts.action;
        if (!actionContext) {
            actionContext = this.contexts.action = new ActionContext(this);
        }
        return actionContext;
    };
    Context.prototype.getStoreContext = function () {
        var storeContext = this.contexts.store;
        if (!storeContext) {
            storeContext = this.contexts.store = new StoreContext(this);
        }
        return storeContext;
    };
    Context.prototype.getViewContext = function () {
        var viewContext = this.contexts.view;
        if (!viewContext) {
            viewContext = this.contexts.view = new ViewContext(this);
        }
        return viewContext;
    };
    Context.prototype.getStore = function (Store) {
        debug('fetching store %s', Store.type);
        var type = Store.type;
        var store = this.stores[type];
        if (!store) {
            store = this.stores[type] = Store.create();
            store.setContext(this.getStoreContext());
            u.each(store.actionListeners, store.register, store);
        }
        return store;
    };
    Context.prototype.executeAction = function (action) {
        return action.execute.apply(action, [this.getActionContext()].concat(u.toArray(arguments).slice(1)));
    };
    Context.prototype.instantiateDependentStores = function (action) {
        var dependentStores = Dispatcher.findDependentStores(action);
        if (!dependentStores || !dependentStores.length) {
            return false;
        }
        u.each(dependentStores, function (Store) {
            debug('instantiating Store %s', Store.type);
            this.getStore(Store);
        }, this);
        return true;
    };
    Context.prototype.dispatch = function (action, payload) {
        debug('preparing the store for action dispatch');
        if (!this.instantiateDependentStores(action)) {
            debug('no related stores register to this action, dispatch stop with no data sync');
            return;
        }
        debug('all related stores are instantiated.');
        debug('starts to dispatching...');
        this.dispatcher.dispatch({
            action: action,
            payload: payload
        });
        debug('%s is dispatched successfully', action.getId());
        return '';
    };
    Context.prototype.pack = function () {
        return u.reduce(this.stores, function (result, store, type) {
            result[type] = store.pack();
            return result;
        }, {});
    };
    module.exports = Context;
});
define('ei/Emitter', [
    'require',
    'exports',
    'module',
    'underscore'
], function (require, exports, module) {
    var EMITTER_LISTENER_POOL_ATTR = '__listeners__';
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
            var listeners = pool[name];
            if (!listeners) {
                return this;
            }
            if (!handler) {
                pool[name] = [];
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
        },
        emit: function (name) {
            var pool = this[EMITTER_LISTENER_POOL_ATTR];
            if (!pool) {
                return this;
            }
            var listeners = pool[name];
            if (!listeners || !listeners.length) {
                return this;
            }
            var args = u.toArray(arguments).slice(1);
            listeners = listeners.slice();
            for (var i = 0, len = listeners.length; i < len; ++i) {
                listeners[i].apply(this, args);
            }
        }
    };
    u.extend(Emitter.prototype, mixins);
    Emitter.enable = function (target) {
        if (u.isFunction(target)) {
            target = target.prototype;
        }
        u.extend(target, mixins);
    };
    module.exports = Emitter;
});
define('ei/Store', [
    'require',
    'exports',
    'module',
    'underscore',
    './Emitter',
    './Dispatcher',
    'debug'
], function (require, exports, module) {
    var u = require('underscore');
    var EventEmitter = require('./Emitter');
    var Dispatcher = require('./Dispatcher');
    var debug = require('debug')('Store');
    var STORE_CLASS_POOL = {};
    var STORE_CHANGE_EVENT_NAME = 'STORE_CHANGE';
    var mixins = {
        setContext: function (context) {
            this.context = context;
        },
        register: function (action, handler) {
            if (u.isString(handler)) {
                handler = this[handler];
            }
            handler = u.bind(handler, this);
            this.context.registerActionHandler(action, handler);
        },
        pack: function () {
            throw new Error('Store must implement the `pack` method');
        },
        unpack: function () {
            throw new Error('Store must implement this `unpack` method');
        },
        addListener: function (handler) {
            this.on(STORE_CHANGE_EVENT_NAME, handler);
        },
        removeListener: function (handler) {
            this.off(STORE_CHANGE_EVENT_NAME, handler);
        },
        trigger: function () {
            this.emit(STORE_CHANGE_EVENT_NAME);
        }
    };
    function register(type, Store) {
        if (STORE_CLASS_POOL[type]) {
            throw new Error('Store ' + type + ' already exist');
        }
        STORE_CLASS_POOL[type] = Store;
    }
    exports.createClass = function (proto) {
        if (!u.isObject(proto)) {
            throw new Error('Store configuration must be an object');
        }
        if (!proto.type) {
            throw new Error('Store Class need a type');
        }
        if (!proto.actionListeners) {
            throw new Error('' + 'Store ' + proto.type + ' must reigster to any/many actions, ' + 'please configurate it by property `actionListeners` on your options' + ': handler name => action name');
        }
        function Store() {
        }
        var type = proto.type;
        debug('creating new store class %s', type);
        Store.create = function () {
            debug('create a new store instance');
            return new Store();
        };
        u.extend(Store.prototype, EventEmitter.prototype, mixins, proto);
        Store.type = type;
        register(type, Store);
        registerActionDependence(Store, proto.actionListeners);
        return Store;
    };
    function registerActionDependence(Store, map) {
        u.each(map, function (action) {
            debug('%s register handler to %s', Store.type, action.getId());
            Dispatcher.registerDependentStore(action, Store);
        });
    }
    exports.getClass = function (name) {
        return STORE_CLASS_POOL[name];
    };
});
define('ei/events', [
    'require',
    'exports',
    'module',
    './Emitter'
], function (require, exports, module) {
    var Emitter = require('./Emitter');
    var events = {};
    Emitter.enable(events);
    module.exports = events;
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
define('ei/App', [
    'require',
    'exports',
    'module',
    'react',
    './Router',
    './Context',
    'when',
    'debug',
    './Store',
    'underscore',
    './events',
    './env'
], function (require, exports, module) {
    var React = require('react');
    var Router = require('./Router');
    var Context = require('./Context');
    var when = require('when');
    var debug = require('debug')('app');
    var Store = require('./Store');
    var u = require('underscore');
    var events = require('./events');
    var env = require('./env');
    function App() {
    }
    App.prototype.router = function (conf) {
        var router = this.router = new Router(conf);
        return router;
    };
    App.prototype.redirect = function () {
    };
    App.prototype.execute = function (request, response) {
        var app = this;
        var context = new Context();
        context.set({
            request: request,
            response: response
        });
        return app.router.route(request).then(function (route) {
            debug('route found');
            context.set('route', route);
            var actionContext = context.getActionContext();
            var action = route.action;
            debug('execute action');
            return when(action.execute(actionContext));
        }).then(function () {
            debug('action executed successfully');
            debug('render the view...');
            var View = context.get('route').view;
            var result = { view: React.createElement(View, { context: context.getViewContext() }) };
            if (env.isServer) {
                debug('server need a pack');
                result.data = context.pack();
            }
            return result;
        });
    };
    App.prototype.config = function () {
    };
    App.prototype.bootstrap = function (view, pack) {
        var context = new Context();
        u.each(pack, function (data, type) {
            var StoreClass = Store.getClass(type);
            var store = context.getStore(StoreClass);
            store.unpack(data);
        });
        return React.createElement(view, { context: context.getViewContext() });
    };
    module.exports = App;
});
define('ei/Action', [
    'require',
    'exports',
    'module',
    'underscore',
    'debug'
], function (require, exports, module) {
    var u = require('underscore');
    var debug = require('debug')('Action');
    var actionGuidIndex = 0;
    var ACTION_HANDLER_GUID_ATTR_NAME = 'ACTION_HANDLER_GUID';
    var ACTION_HANDLER_GUID_PREFIX = 'A-';
    function nextGuid() {
        return ACTION_HANDLER_GUID_PREFIX + ++actionGuidIndex;
    }
    function Action(options) {
        u.extend(this, options);
    }
    Action.prototype.getId = function () {
        var id = this[ACTION_HANDLER_GUID_ATTR_NAME];
        if (!id) {
            id = this[ACTION_HANDLER_GUID_ATTR_NAME] = nextGuid();
            debug('Action get new id: %s', id);
        }
        return id;
    };
    exports.create = function (proto) {
        if (!u.isObject(proto)) {
            throw new Error('create a Action with a object option');
        }
        if (!u.isFunction(proto.execute)) {
            throw new Error('Action must have a execute method');
        }
        return new Action(proto);
    };
});
define('ei/mixin/context', [
    'require',
    'exports',
    'module',
    'react',
    'underscore'
], function (require, exports, module) {
    var React = require('react');
    var u = require('underscore');
    var base = {
        componentDidMount: function () {
            u.each(this.storeListeners || {}, function (Stores, handlerName) {
                u.each([].concat(Stores), function (Store) {
                    this.addStoreListener(Store, this[handlerName]);
                }, this);
            }, this);
        },
        componentWillUnmount: function () {
            u.each(this.storeListeners || {}, function (Stores, handlerName) {
                u.each([].concat(Stores), function (Store) {
                    this.removeStoreListener(Store, this[handlerName]);
                }, this);
            }, this);
        },
        addStoreListener: function (Store, handler) {
            this.getStore(Store).addListener(handler);
            return this;
        },
        removeStoreListener: function (Store, handler) {
            this.getStore(Store).removeListener(handler);
            return this;
        }
    };
    var types = {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    };
    exports.context = u.extend({}, base, {
        propsTypes: { context: React.PropTypes.object.isRequired },
        childContextTypes: types,
        getChildContext: function () {
            return this.props.context;
        },
        getStore: function (Store) {
            return this.props.context.getStore(Store);
        },
        execute: function () {
            var context = this.props.context;
            return context.executeAction.apply(context, arguments);
        }
    });
    exports.incontext = u.extend({}, base, {
        contextTypes: types,
        getStore: function (Store) {
            return this.context.getStore(Store);
        },
        execute: function () {
            var context = this.context;
            return context.executeAction.apply(context, arguments);
        }
    });
});
define('ei/mixin/layout', [
    'require',
    'exports',
    'module',
    'react',
    './Layout'
], function (require, exports, module) {
    var React = require('react');
    var Layout = require('./Layout');
    module.exports = {
        propTypes: { layout: React.PropTypes.object },
        randerLayout: function (html) {
            return Layout.render(this.props.layout, { app: html });
        }
    };
});
define('ei/mixin', [
    'require',
    'exports',
    'module',
    'underscore',
    './mixin/context',
    './mixin/layout'
], function (require, exports, module) {
    var u = require('underscore');
    u.extend(exports, require('./mixin/context'), require('./mixin/layout'));
});
define('ei/main', [
    'require',
    'exports',
    'module',
    './App',
    './Store',
    './Action',
    './mixin'
], function (require, exports, module) {
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
    module.exports = ei;
});