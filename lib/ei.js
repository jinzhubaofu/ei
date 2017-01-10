/*! 2016 Baidu Inc. All Rights Reserved */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-redux"), require("redux"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-redux", "redux"], factory);
	else if(typeof exports === 'object')
		exports["ei"] = factory(require("react"), require("react-redux"), require("redux"));
	else
		root["ei"] = factory(root["React"], root["react-redux"], root["redux"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_22__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(exports);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod.exports);
	        global.page = mod.exports;
	    }
	})(this, function (exports) {
	    'use strict';

	    /**
	     * @file page init action creator
	     * @author leon(ludafa@outlook.com)
	     */

	    var INIT = 'ei/INIT';

	    exports.INIT = INIT;

	    exports.init = function (payload) {
	        return {
	            type: INIT,
	            payload: payload
	        };
	    };

	    var REPLACE = 'ei/REPLACE';

	    exports.REPLACE = REPLACE;

	    exports.replace = function (payload) {
	        return {
	            type: REPLACE,
	            payload: payload
	        };
	    };
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, require('./Emitter'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, global.Emitter);
	    global.events = mod.exports;
	  }
	})(this, function (module, Emitter) {
	  'use strict';

	  var events = {}; /**
	                    * @file ei系统消息总线
	                    * @author Leon(leon@outlook.com)
	                    * @module events
	                    */

	  module.exports = Emitter.enable(events);
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod);
	        global.assign = mod.exports;
	    }
	})(this, function (module) {
	    'use strict';

	    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	        return typeof obj;
	    } : function (obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };

	    /**
	     * @file es6 Object.assign polyfill
	     * @author leon(ludafa@outlook.com)
	     */

	    var hasOwnProperty = Object.prototype.hasOwnProperty;

	    module.exports = Object.assign || function (target) {

	        if (target == null) {
	            throw new Error('assign target cannot be null');
	        }

	        for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            sources[_key - 1] = arguments[_key];
	        }

	        for (var i = 0, len = sources.length; i < len; ++i) {

	            var source = sources[i];

	            if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') {
	                continue;
	            }

	            /* eslint-disable fecs-use-for-of */
	            for (var key in source) {
	                if (hasOwnProperty.call(source, key)) {
	                    target[key] = source[key];
	                }
	            }
	            /* eslint-enable fecs-use-for-of */
	        }

	        return target;
	    };
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod);
	    global.guid = mod.exports;
	  }
	})(this, function (module) {
	  "use strict";

	  /**
	   * @file guid
	   * @author leon(ludafa@outlook.com)
	   */

	  module.exports = function () {
	    return Math.random().toString(36).substr(2, 12);
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod);
	        global.Container = mod.exports;
	    }
	})(this, function (module) {
	    "use strict";

	    /**
	     * @file bean container copy from inverse
	     * @author Leon(leon@outlook.com)
	     */

	    /* eslint-disable fecs-prefer-class */
	    /* eslint-disable prefer-rest-params */
	    /**
	     * IOC窗口
	     *
	     * @constructor Container
	     */
	    function Container() {
	        this.boundCallbacks = {};
	        this.singletonCallbacks = {};
	        this.instantiatedSingletons = {};
	        this.registeredObjects = {};
	    }

	    /**
	     * 生成一个指定的实例
	     *
	     * @public
	     * @param {!string} name 资源标识符
	     * @return {*}
	     */
	    Container.prototype.make = function (name) {

	        if (this.registeredObjects[name]) {
	            return this.registeredObjects[name];
	        }

	        if (this.singletonCallbacks[name]) {

	            var instances = this.instantiatedSingletons;
	            var instance = instances[name];

	            if (!instance) {
	                instance = instances[name] = this.singletonCallbacks[name].apply(this, arguments);
	            }

	            return instance;
	        }

	        var boundCallback = this.boundCallbacks[name];

	        return boundCallback ? boundCallback.apply(this, arguments) : null;
	    };

	    /**
	     * 绑定一个factory
	     *
	     * 当请求这个资源时会通过factory生成新的实例
	     * 每次都会生成一个新的实例
	     *
	     * @param {!string}   name    资源标识符
	     * @param {!Function} factory 工厂函数
	     * @return {module:Container}
	     */
	    Container.prototype.bind = function (name, factory) {
	        this.boundCallbacks[name] = factory;
	        return this;
	    };

	    /**
	     * 注册一个单例资源
	     *
	     * 当请求这个资源时会通过factory生成新的实例
	     * 但是只会生成一个此类资源
	     *
	     * @param {!string}   name    资源标识符
	     * @param {!Function} factory 资源工厂函数
	     * @return {module:Container}
	     */
	    Container.prototype.singleton = function (name, factory) {
	        this.singletonCallbacks[name] = factory;
	        return this;
	    };

	    /**
	     * 注册一个资源
	     *
	     * 这个与bind和singleton的区别是，
	     * 这里直接注册一个资源，给的是个object，而不是工厂函数
	     * 不会经过工厂函数创建资源实例了
	     *
	     * @param {!string} name   资源标识符
	     * @param {*}       object 资源对象
	     * @return {module:Container}
	     */
	    Container.prototype.register = function (name, object) {
	        this.registeredObjects[name] = object;
	        return this;
	    };

	    module.exports = Container;
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('./util/assign'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.assign);
	        global.Emitter = mod.exports;
	    }
	})(this, function (module, assign) {
	    'use strict';

	    /**
	     * @file Emitter
	     * @author Leon(leon@outlook.com)
	     */

	    var EMITTER_LISTENER_POOL_ATTR = '__listeners__';
	    var EMITTER_CURRENT_EVENT_ATTR = '__event__';

	    /* eslint-disable fecs-prefer-class */

	    /**
	     * Emitter
	     *
	     * @constructor
	     */
	    function Emitter() {}

	    /* eslint-enable fecs-prefer-class */

	    /** @lends Emitter.prototype */
	    var mixins = {
	        on: function on(name, handler) {

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
	        off: function off(name, handler) {

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

	            // 没有指定移除的回调函数，那么移除所有的
	            if (!handler) {
	                listeners.length = 0;
	                pool[name] = [];
	                return this;
	            }

	            // 找到指定的回调函数，移除它
	            for (var i = listeners.length - 1; i >= 0; --i) {
	                if (listeners[i] === handler) {
	                    listeners.splice(i, 1);
	                    return this;
	                }
	            }

	            return this;
	        },
	        once: function once(name, handler) {

	            var me = this;

	            function onceHandler() {
	                me.off(name, onceHandler);

	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }

	                return handler.apply(me, args);
	            }

	            me.on(name, onceHandler);

	            return this;
	        },
	        emit: function emit(name) {

	            var pool = this[EMITTER_LISTENER_POOL_ATTR];

	            // 连pool都没有，那真是一个回调都没有，那么直接返回
	            if (!pool) {
	                return this;
	            }

	            // 把*和指定事件类型的事件回调合并在一起
	            var listeners = [].concat(pool[name] || [], pool['*'] || []);

	            // 如果没有回调函数，那么直接返回
	            if (!listeners.length) {
	                return this;
	            }

	            this[EMITTER_CURRENT_EVENT_ATTR] = name;

	            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                args[_key2 - 1] = arguments[_key2];
	            }

	            for (var i = 0, len = listeners.length; i < len; ++i) {
	                listeners[i].apply(this, args);
	            }

	            this[EMITTER_CURRENT_EVENT_ATTR] = null;

	            return this;
	        },
	        getCurrentEvent: function getCurrentEvent() {
	            return this[EMITTER_CURRENT_EVENT_ATTR];
	        },
	        destroyEvents: function destroyEvents() {

	            var pool = this[EMITTER_LISTENER_POOL_ATTR];

	            if (pool) {

	                /* eslint-disable fecs-use-for-of */
	                for (var type in pool) {
	                    if (pool[type]) {
	                        pool[type].length = 0;
	                        pool[type] = null;
	                    }
	                }
	                /* eslint-enable fecs-use-for-of */

	                this[EMITTER_LISTENER_POOL_ATTR] = null;
	            }

	            return this;
	        }
	    };

	    assign(Emitter.prototype, mixins);

	    /**
	     * 激活一个对象，使它获得Emitter的所有技能
	     *
	     * 如果被激活的对象是一个函数，那么它的实例会拥有Emitter的技能
	     *
	     * @note 我们在激活一个函数时，会对它的原型对象进行修改
	     *
	     * @param {!(Object | Function)} target 即将被激活的对象
	     * @return {Object}
	     */
	    Emitter.enable = function (target) {

	        if (typeof target === 'function') {
	            target = target.prototype;
	        }

	        return assign(target, mixins);
	    };

	    module.exports = Emitter;
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod);
	        global.invariant = mod.exports;
	    }
	})(this, function (module) {
	    'use strict';

	    /**
	     * @file invariant
	     * @author Leon(leon@outlook.com)
	     */

	    /**
	     * Use invariant() to assert state which your program assumes to be true.
	     *
	     * Provide sprintf-style format (only %s is supported) and arguments
	     * to provide information about what broke and what you were
	     * expecting.
	     *
	     * The invariant message will be stripped in production, but the invariant
	     * will remain to ensure logic does not differ in production.
	     */

	    /* eslint-disable max-params */

	    /**
	     * 断言
	     *
	     * @ignore
	     *
	     * @param {boolean}     condition 断言条件
	     * @param {string}      format 断言失败消息模板
	     * @param {*} a 断言失败消息数据
	     * @param {*} b 断言失败消息数据
	     * @param {*} c 断言失败消息数据
	     * @param {*} d 断言失败消息数据
	     * @param {*} e 断言失败消息数据
	     * @param {*} f 断言失败消息数据
	     */
	    function invariant(condition, format, a, b, c, d, e, f) {

	        if (condition) {
	            return;
	        }

	        if (!format) {
	            throw new Error('' + 'Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	        }

	        var args = [a, b, c, d, e, f];
	        var argIndex = 0;

	        var message = '' + 'Invariant Violation: ' + format.replace(/%s/g, function () {
	            return args[argIndex++];
	        });

	        throw new Error(message);
	    }

	    /* eslint-enable max-params */

	    module.exports = invariant;
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(7), __webpack_require__(2), __webpack_require__(11), __webpack_require__(13), __webpack_require__(3), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('./util/invariant'), require('./events'), require('./Router'), require('./env'), require('./util/assign'), require('./util/createAppComponent'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.invariant, global.events, global.Router, global.env, global.assign, global.createAppComponent);
	        global.App = mod.exports;
	    }
	})(this, function (module, invariant, events, Router, env, assign, createAppComponent) {
	    'use strict';

	    /* eslint-disable fecs-prefer-class */

	    /**
	     * App
	     *
	     * @constructor
	     * @param {!Object} options 参数
	     * @param {Array.Object} options.routes 路由配置
	     */
	    /**
	     * @file App
	     * @author Leon(leon@outlook.com)
	     */

	    function App() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


	        invariant(options, 'App need options');
	        invariant(options.routes || options.router, 'App need routes/router');

	        assign(this, options);

	        /**
	         * 路由器
	         *
	         * @member {module:Router}
	         */
	        this.router = this.router || new Router(this.routes);
	    }

	    /* eslint-enable fecs-prefer-class */

	    /**
	     * 处理一个请求
	     *
	     * @param {!Object}  request      请求
	     * @param {boolean}  needRawState 是否需要未经加工的page数据
	     * @return {Promise}
	     *
	     * @fires module:events~app-request
	     * @fires module:events~app-get-initial-state
	     * @fires module:events~app-get-initial-state-succeed
	     * @fires module:events~app-get-initial-state-failed
	     * @fires module:events~app-response-in-json
	     * @fires module:events~app-response-in-html
	     * @fires module:events~app-page-loaded
	     * @fires module:events~app-page-bootstrap
	     * @fires module:events~app-page-bootstrap-succeed
	     */
	    App.prototype.execute = function (request, needRawState) {

	        invariant(env.isServer, 'App.execute() must run on server');

	        /**
	         * @event module:events~app-request
	         */
	        events.emit('app-request');

	        var route = this.route(request);

	        if (!route) {
	            return Promise.reject({
	                status: 404
	            });
	        }

	        return this

	        // 加载页面模块
	        .loadPage(route.page)

	        // 加载初始化数据
	        .then(function (Page) {

	            var page = new Page();

	            return Promise
	            // 这里一定要用 Promise 包裹一下，这个接口可以返回 Promise 或者是 *
	            .resolve(page.getInitialState(request)).then(function (state) {

	                if (needRawState) {

	                    /**
	                     * @event module:events~app-response-in-json
	                     */
	                    events.emit('app-response-in-json');

	                    return {
	                        state: state,
	                        route: route
	                    };
	                }

	                /**
	                 * @event module:events~app-response-in-html
	                 */
	                events.emit('app-response-in-html');

	                // 触发 page 的初始归并
	                page.init(state);

	                /**
	                 * @event module:events~app-page-bootstrap
	                 */
	                events.emit('app-page-bootstrap');

	                /**
	                 * @event module:events~app-page-bootstrap
	                 */
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

	    /**
	     * 根目录路径
	     *
	     * @public
	     *
	     * @param {!string} basePath 根目录路径
	     *
	     * @return {module:App}
	     */
	    App.prototype.setBasePath = function (basePath) {
	        this.basePath = basePath;
	        return this;
	    };

	    /**
	     * 加载Page类
	     *
	     * @protected
	     *
	     * @param {!string} page 页面模块路径
	     *
	     * @return {Promise}
	     *
	     * @fires module:events~app-page-loaded
	     * @fires module:events~app-load-page-on-server
	     * @fires module:events~app-load-page-on-client
	     */
	    App.prototype.loadPage = function (page) {
	        var _this = this;

	        if (typeof page === 'function') {
	            return Promise.resolve(page);
	        }

	        var pool = this.pool;

	        if (pool && pool[page]) {

	            /**
	             * @event module:events~app-page-loaded
	             */
	            events.emit('app-page-loaded');

	            return Promise.resolve(pool[page]);
	        }

	        var loadMethodName = env.isServer ? 'resolveServerModule' : 'resolveClientModule';

	        return this[loadMethodName](page).then(function (Page) {
	            return _this.resolvePage(Page);
	        });
	    };

	    /**
	     * 解析 Page 类
	     *
	     * @protected
	     *
	     * @param {Object|Function} Page 页面模块
	     *
	     * @return {Promise}
	     */
	    App.prototype.resolvePage = function (Page) {

	        // @hack
	        // 这种是 commonjs/amd 直接返回的 Page
	        if (typeof Page === 'function') {
	            return Page;
	        }

	        // 这种是 export default 输出的
	        return Page['default'];
	    };

	    /**
	     * 服务器端加载Page模块
	     *
	     * @private
	     *
	     * @param {string} moduleId Page模块id
	     *
	     * @return {Promise}
	     */
	    App.prototype.resolveServerModule = function (moduleId) {
	        var _this2 = this;

	        /**
	         * @event module:events~app-load-page-on-server
	         */
	        events.emit('app-load-page-on-server', moduleId);

	        var basePath = this.basePath;

	        invariant(basePath, 'ei need a basePath to resolve your page');

	        var path = basePath + '/' + moduleId;

	        return new Promise(function (resolve, reject) {

	            try {
	                var Page = __webpack_require__(20)(path);

	                var pool = _this2.pool;

	                if (!pool) {
	                    pool = _this2.pool = {};
	                }

	                pool[moduleId] = Page;

	                resolve(Page);
	            } catch (e) {
	                reject(e);
	            }
	        });
	    };

	    /**
	     * 在客户端上加载Page模块
	     *
	     * @private
	     *
	     * @param {string} moduleId Page模块id
	     *
	     * @return {Promise}
	     */
	    App.prototype.resolveClientModule = function (moduleId) {

	        /**
	         * @event module:events~app-load-page-on-client
	         */
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

	    /**
	     * 路由
	     *
	     * @protected
	     *
	     * @param {!Object} request 请求
	     *
	     * @return {?Object}
	     *
	     * @fires module:events~app-route-succeed
	     * @fires module:events~app-route-succeed
	     * @fires module:events~app-route-failed
	     */
	    App.prototype.route = function (request) {

	        /**
	         * @event module:events~app-route
	         */
	        events.emit('app-route');

	        var config = this.router.route(request);

	        if (config) {

	            /**
	             * @event module:events~app-route-succeed
	             */
	            events.emit('app-route-succeed');
	        } else {

	            /**
	             * @event module:events~app-route-failed
	             */
	            events.emit('app-route-failed', request);
	        }

	        return config;
	    };

	    App.Component = createAppComponent(App);

	    module.exports = App;
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(3), __webpack_require__(8), __webpack_require__(1), __webpack_require__(21), __webpack_require__(22), __webpack_require__(7), __webpack_require__(4), __webpack_require__(2), __webpack_require__(1), __webpack_require__(6), __webpack_require__(12), __webpack_require__(15), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('./util/assign'), require('react'), require('./actionCreator/page'), require('react-redux'), require('redux'), require('./util/invariant'), require('./util/guid'), require('./events'), require('./actionCreator/page'), require('./Emitter'), require('./component/Page'), require('./middleware/pageActionEventProxy'), require('./util/createPageComponent'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.assign, global.react, global.page, global.reactRedux, global.redux, global.invariant, global.guid, global.events, global.page, global.Emitter, global.Page, global.pageActionEventProxy, global.createPageComponent);
	        global.Page = mod.exports;
	    }
	})(this, function (module, assign, React, _require, _require2, _require3, invariant, guid, events, _require4, Emitter, PageComponent, pageActionEventProxy, createPageComponent) {
	    'use strict';

	    var REPLACE = _require.REPLACE,
	        replace = _require.replace;
	    var Provider = _require2.Provider;
	    var createStore = _require3.createStore,
	        applyMiddleware = _require3.applyMiddleware,
	        combineReducers = _require3.combineReducers,
	        compose = _require3.compose;
	    var _init = _require4.init;

	    /* eslint-enable fecs-min-vars-per-destructure */

	    /* eslint-disable fecs-prefer-class */

	    /**
	     * 页面
	     *
	     * @constructor
	     * @param {*} initialState 初始数据状态
	     */
	    function Page(initialState) {
	        this.initialize(initialState);
	    }

	    /* eslint-enable fecs-prefer-class */

	    /** @lends Page.prototype */
	    Page.prototype = {

	        constructor: Page,

	        initialize: function initialize(initialState) {
	            var _this = this;

	            this.id = guid();

	            var reducer = typeof this.reducer === 'function' ? this.reducer : combineReducers(this.reducer);

	            var enhancer = compose;

	            if (("dev") !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
	                enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
	                    name: 'ei-page@' + this.id
	                });
	            }

	            this.context = createStore(function (state, action) {
	                if (action.type === REPLACE) {
	                    return action.payload;
	                }
	                return reducer(state, action);
	            }, initialState, enhancer(applyMiddleware.apply(undefined, this.middlewares.map(function (middleware) {
	                return middleware(_this);
	            }))));
	        },


	        middlewares: [pageActionEventProxy],

	        init: function init(initialState) {
	            this.dispatch(_init(initialState));
	            return this;
	        },
	        createElement: function createElement(props) {

	            var context = this.context;
	            var View = this.view;

	            return React.createElement(
	                Provider,
	                { store: context },
	                React.createElement(View, props)
	            );
	        },
	        getState: function getState() {
	            return this.context.getState();
	        },
	        setState: function setState(state) {
	            this.context.dispatch(replace(state));
	            return this;
	        },
	        dispatch: function dispatch(action) {

	            /**
	             * @event module:events~page-dispatch
	             * @param {(Object | Function)} action 动作
	             */
	            events.emit('page-dispatch', action);

	            this.emit('dispatch', action);

	            this.context.dispatch(action);

	            return action;
	        },
	        getInitialState: function getInitialState(request) {
	            return {};
	        },
	        dispose: function dispose() {

	            /**
	             * @event module:event~page-dispose
	             */
	            events.emit('page-dispose');

	            this.emit('dispose');

	            // @TODO 补充销毁时的必要处理

	            return this;
	        }
	    };

	    Emitter.enable(Page);

	    /**
	     * 生成Page子类
	     *
	     * @param {!Object} proto 扩展Page的配置
	     * @return {Function}
	     */
	    Page.extend = function (proto) {

	        invariant(proto, 'create Page need options');

	        invariant(proto.reducer, 'Pager must have a reducer');

	        invariant(proto.view, 'Pager must have a view');

	        /**
	         * SubPage
	         *
	         * @class
	         * @param {*} initialState 脱水状态
	         */
	        function SubPage(initialState) {
	            Page.call(this, initialState);
	        }

	        SubPage.Component = createPageComponent(SubPage);

	        assign(SubPage.prototype, Page.prototype, proto);

	        return SubPage;
	    };

	    Page.Component = PageComponent;

	    module.exports = Page;
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod);
	        global.Router = mod.exports;
	    }
	})(this, function (module) {
	    "use strict";

	    /**
	     * @file Router
	     * @author Leon(leon@outlook.com)
	     */

	    /* eslint-disable fecs-prefer-class */

	    /**
	     * 简易的路由器
	     *
	     * @class
	     * @constructor Router
	     * @param {Array.<Object>} routes 路由配置
	     */
	    function Router(routes) {
	        this.routes = routes || [];
	    }

	    /**
	     * 对一个请求进行路由
	     *
	     * @param {!Object} request 请求对象
	     * @return {?Object}
	     */
	    Router.prototype.route = function (request) {

	        for (var i = this.routes.length - 1; i >= 0; i--) {

	            var route = this.routes[i];

	            if (route.path === request.pathname) {
	                return route;
	            }
	        }
	    };

	    /**
	     * 添加路由配置
	     *
	     * @param {!Object} config 配置
	     * @return {module:Route}
	     */
	    Router.prototype.addRoute = function (config) {

	        this.routes.push(config);

	        return this;
	    };

	    module.exports = Router;
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(8), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('react'), require('../util/guid'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.react, global.guid);
	        global.Page = mod.exports;
	    }
	})(this, function (module, React, guid) {
	    'use strict';

	    var _extends = Object.assign || function (target) {
	        for (var i = 1; i < arguments.length; i++) {
	            var source = arguments[i];

	            for (var key in source) {
	                if (Object.prototype.hasOwnProperty.call(source, key)) {
	                    target[key] = source[key];
	                }
	            }
	        }

	        return target;
	    };

	    function _objectWithoutProperties(obj, keys) {
	        var target = {};

	        for (var i in obj) {
	            if (keys.indexOf(i) >= 0) continue;
	            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	            target[i] = obj[i];
	        }

	        return target;
	    }

	    var ASYNC_PAGE_LOAD_ATTR = 'ASYNC_PAGE_LOAD_ATTR';

	    /* eslint-disable fecs-prefer-class */

	    var Page = React.createClass({

	        displayName: 'Page',

	        getInitialState: function getInitialState() {
	            return {
	                pendding: false,
	                ready: false,
	                error: null
	            };
	        },
	        componentDidMount: function componentDidMount() {
	            var _props = this.props,
	                initialState = _props.initialState,
	                request = _props.request;


	            this.renderPage(request, initialState);
	        },
	        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

	            var request = this.props.request || {};
	            var pathname = request.pathname,
	                search = request.search;

	            var nextRequest = nextProps.request;

	            if (request !== nextRequest && (pathname !== nextRequest.pathname || search !== nextRequest.search)) {
	                this.renderPage(nextRequest, null);
	            }
	        },
	        renderPage: function renderPage(request, initialState) {
	            var _this = this;

	            var route = this.context.route(request);

	            if (!route) {

	                this.setState({
	                    ready: false,
	                    error: {
	                        status: 404,
	                        message: '啊哦，这个页面迷失在了茫茫宇宙中。。。'
	                    },
	                    pendding: false,
	                    Page: null
	                });

	                return;
	            }

	            this.setState({
	                pendding: true,
	                error: null,
	                ready: false
	            });

	            var token = this[ASYNC_PAGE_LOAD_ATTR] = guid();

	            this.context.loadPage(route.page).then(function (Page) {

	                // 对照 token
	                // 如果 token 未变化，才能进行渲染
	                // 如果 token 已发生变化 ，那么吞掉渲染
	                if (token === _this[ASYNC_PAGE_LOAD_ATTR]) {
	                    _this.setState({
	                        Page: Page,
	                        error: null,
	                        pendding: false,
	                        ready: true
	                    });
	                }
	            })['catch'](function (error) {

	                // 对照 token
	                // 如果 token 未变化，才能进行渲染
	                // 如果 token 已发生变化 ，那么吞掉渲染
	                if (token === _this[ASYNC_PAGE_LOAD_ATTR]) {
	                    _this.setState({
	                        error: error,
	                        ready: false,
	                        pendding: false,
	                        Page: null
	                    });
	                }
	            });
	        },
	        onRedirect: function onRedirect(action) {

	            var onRedirect = this.props.onRedirect;

	            if (onRedirect) {
	                onRedirect(action);
	                return;
	            }

	            this.renderPage(action.payload.location);
	        },
	        render: function render() {
	            var _props2 = this.props,
	                request = _props2.request,
	                renderLoadingMessage = _props2.renderLoadingMessage,
	                renderErrorMessage = _props2.renderErrorMessage,
	                rest = _objectWithoutProperties(_props2, ['request', 'renderLoadingMessage', 'renderErrorMessage']);

	            var _state = this.state,
	                ready = _state.ready,
	                pendding = _state.pendding,
	                Page = _state.Page,
	                error = _state.error;


	            var state = 'blank';
	            var content = null;

	            // 如果 request 是空的，那么我们认为它相当于 iframe src="about:blank"
	            if (request != null) {

	                if (error) {
	                    content = renderErrorMessage(error);
	                    state = 'error';
	                } else if (pendding) {
	                    content = renderLoadingMessage();
	                    state = 'pendding';
	                } else if (ready) {
	                    try {
	                        content = React.createElement(Page.Component, _extends({}, rest, {
	                            renderLoadingMessage: renderLoadingMessage,
	                            renderErrorMessage: renderErrorMessage,
	                            onRedirect: this.onRedirect,
	                            request: request }));
	                        state = 'ready';
	                    } catch (e) {
	                        content = renderErrorMessage(e);
	                        state = 'error';
	                    }
	                }
	            }

	            return React.createElement(
	                'div',
	                { className: 'ui-page state-' + state },
	                content
	            );
	        }
	    });

	    var PropTypes = React.PropTypes;

	    Page.contextTypes = {
	        route: PropTypes.func,
	        loadPage: PropTypes.func
	    };

	    Page.propTypes = {
	        request: PropTypes.shape({
	            pathname: PropTypes.string.isRequired,
	            query: PropTypes.object,
	            search: PropTypes.string
	        }),
	        initialState: PropTypes.any,
	        renderLoadingMessage: PropTypes.func,
	        renderErrorMessage: PropTypes.func
	    };

	    Page.defaultProps = {
	        renderErrorMessage: function renderErrorMessage(error) {
	            return React.createElement(
	                'span',
	                null,
	                error.message
	            );
	        },
	        renderLoadingMessage: function renderLoadingMessage() {
	            return React.createElement(
	                'span',
	                null,
	                'loading...'
	            );
	        }
	    };

	    module.exports = Page;
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports);
	    global.env = mod.exports;
	  }
	})(this, function (exports) {
	  'use strict';

	  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  };

	  /**
	   * @file 环境探测
	   * @author Leon(leon@outlook.com)
	   * @module env
	   * @inner
	   */

	  try {

	    /**
	     * 是否为服务器端环境
	     *
	     * @member {boolean}
	     */
	    exports.isServer = 'object' === (typeof process === 'undefined' ? 'undefined' : _typeof(process)) && Object.prototype.toString.call(process) === '[object process]';
	  } catch (e) {}

	  /**
	   * 是否为客户端环境
	   *
	   * @member {boolean}
	   */
	  exports.isClient = !exports.isServer;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(9), __webpack_require__(10), __webpack_require__(5), __webpack_require__(2), __webpack_require__(16), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('./App'), require('./Page'), require('./Container'), require('./events'), require('./resource'), require('./actionCreator/page'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.App, global.Page, global.Container, global.events, global.resource, global.page);
	        global.index = mod.exports;
	    }
	})(this, function (module, App, Page, Container, events, resource, _require) {
	    'use strict';

	    var INIT = _require.INIT,
	        REPLACE = _require.REPLACE,
	        init = _require.init,
	        replace = _require.replace;


	    module.exports = {
	        App: App,
	        Page: Page,
	        Container: Container,
	        events: events,
	        resource: resource,
	        actionTypes: {
	            INIT: INIT,
	            REPLACE: REPLACE
	        },
	        actions: {
	            init: init,
	            replace: replace
	        }
	    };
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod);
	        global.pageActionEventProxy = mod.exports;
	    }
	})(this, function (module) {
	    'use strict';

	    /**
	     * @file page action event proxy
	     * @author leon(ludafa@outlook.com)
	     */

	    module.exports = function (page) {

	        return function (store) {
	            return function (next) {
	                return function (action) {

	                    if (typeof action !== 'function') {
	                        var event = action.event,
	                            type = action.type;

	                        page.emit(event || type, action);
	                    }

	                    return next(action);
	                };
	            };
	        };
	    };
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./Container'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.Container);
	    global.resource = mod.exports;
	  }
	})(this, function (exports, Container) {
	  'use strict';

	  var container = new Container();

	  /**
	   * 注册一个资源操作对象
	   *
	   * @method module:Resource.reigist
	   *
	   * @param {!string} type 资源标识符
	   * @param {(Object | Function)} resource 资源操纵对象
	   *
	   * @return {module:Resource}
	   */
	  /**
	   * @file 资源容器
	   *
	   * 我们知道在客户端上，我们只能使用ajax/socket两种途径操纵资源
	   * 而在服务器端上，可选的资源服务非常多，比如mysql/mongodb/redis或者他们数据服务
	   *
	   * 因此，我们提供了这个模块，用来处理资源在不同平台上的差异性
	   *
	   * 我们通过ioc容器来对资源依赖进行解耦，
	   *
	   * 在不同平台上注入相同接口的资源操纵对象，
	   *
	   * 在同构代码中使用`get`方法获取到这些对象，直接使用即可
	   *
	   * @author Leon(leon@outlook.com)
	   * @module resource
	   */

	  exports.register = function (type, resource) {
	    container.register(type, resource);
	    return this;
	  };

	  /**
	   * 获取一个资源操作对象
	   *
	   * @method module:Resource.get
	   *
	   * @param {!string} type 资源标识符
	   *
	   * @return {(Object | Function)}
	   */
	  exports.get = function (type) {
	    return container.make(type);
	  };
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('react'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.react);
	        global.createAppComponent = mod.exports;
	    }
	})(this, function (module, React) {
	    'use strict';

	    var PropTypes = React.PropTypes; /**
	                                      * @file create app component
	                                      * @author leon(ludafa@outlook.com)
	                                      */

	    function createAppComponent(App) {

	        var AppComponent = React.createClass({
	            displayName: 'AppComponent',
	            getInitialState: function getInitialState() {
	                var _props = this.props,
	                    routes = _props.routes,
	                    router = _props.router,
	                    app = _props.app;


	                this.app = app || new App({ routes: routes, router: router });

	                return {};
	            },
	            getChildContext: function getChildContext() {

	                var app = this.app;

	                return {
	                    route: function route(request) {
	                        return app.route(request);
	                    },
	                    loadPage: function loadPage(pageModuleId) {
	                        return app.loadPage(pageModuleId);
	                    }
	                };
	            },
	            render: function render() {
	                return this.props.children;
	            }
	        });

	        AppComponent.propTypes = {
	            routes: PropTypes.arrayOf(PropTypes.shape({
	                path: PropTypes.string.isRequired,
	                page: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
	            })),
	            app: PropTypes.instanceOf(App),
	            router: PropTypes.object
	        };

	        AppComponent.childContextTypes = {
	            route: PropTypes.func,
	            loadPage: PropTypes.func
	        };

	        return AppComponent;
	    }

	    module.exports = createAppComponent;
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(8), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('react'), require('../util/guid'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.react, global.guid);
	        global.createPageComponent = mod.exports;
	    }
	})(this, function (module, React, guid) {
	    'use strict';

	    /**
	     * @file create a component class for Page
	     * @author leon(ludafa@outlook.com)
	     */

	    var PropTypes = React.PropTypes;
	    var PAGE_GET_INITIAL_STATE_GUID_ATTR = 'PAGE_GET_INITIAL_STATE_GUID_ATTR';

	    var hasOwn = Object.prototype.hasOwnProperty;

	    function createPageComponent(Page) {

	        var PageComponent = React.createClass({

	            displayName: 'PageComponent',

	            getInitialState: function getInitialState() {

	                var me = this;
	                var props = me.props;
	                var initialState = props.initialState;

	                var page = me.page = new Page(initialState);

	                // 添加事件代理
	                page.on('*', function () {

	                    var eventName = page.getCurrentEvent().split(/[\-_]/).map(function (term) {
	                        return term.charAt(0).toUpperCase() + term.slice(1).toLowerCase();
	                    }).join('');

	                    var handler = props['on' + eventName];

	                    if (typeof handler === 'function') {
	                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                            args[_key] = arguments[_key];
	                        }

	                        handler.apply(me, args);
	                    }
	                });

	                return {
	                    stage: initialState == null ? 'INITED' : 'LOADED',
	                    error: null
	                };
	            },
	            componentDidMount: function componentDidMount() {
	                var handleRequest = this.handleRequest,
	                    page = this.page,
	                    props = this.props;

	                var stage = this.state.stage;

	                if (stage === 'LOADED') {
	                    return;
	                }

	                handleRequest(page, props.request);
	            },
	            componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

	                var request = this.props.request;
	                var nextRequest = nextProps.request;

	                if (request !== nextRequest) {
	                    this.handleRequest(this.page, nextRequest);
	                }
	            },
	            componentWillUnmount: function componentWillUnmount() {
	                var page = this.page;
	                if (page) {
	                    page.dispose();
	                }
	                this.page = null;
	            },
	            handleRequest: function handleRequest(page, request) {
	                var _this = this;

	                // 我们使用一个不会重复的 token 来完成 promise abort 的处理
	                // 每次我们发起异步请求时都会生成一个唯一的 token
	                // 当异步请求完成时会检查 token 是否还是一致的
	                // 如果不是一致的（也就是在这次请求之后又发生了一次请求，token 就更新了），就算球了
	                var token = this[PAGE_GET_INITIAL_STATE_GUID_ATTR] = guid();

	                this.setState({
	                    stage: 'LOADING',
	                    error: null
	                });

	                Promise.resolve(page.getInitialState(request)).then(function (state) {

	                    page.init(state);

	                    // 如果不是一致的（也就是在这次请求之后又发生了一次请求，token 就更新了），就算球了！
	                    if (token === _this[PAGE_GET_INITIAL_STATE_GUID_ATTR]) {
	                        _this.setState({
	                            stage: 'LOADED'
	                        });
	                    }
	                }, function (error) {

	                    // 如果不是一致的（也就是在这次请求之后又发生了一次请求，token 就更新了），就算球了~
	                    if (token === _this[PAGE_GET_INITIAL_STATE_GUID_ATTR]) {
	                        _this.setState({
	                            error: error,
	                            stage: 'LOADED'
	                        });
	                    }
	                });
	            },
	            render: function render() {
	                var page = this.page,
	                    props = this.props;
	                var _state = this.state,
	                    error = _state.error,
	                    stage = _state.stage;
	                var renderLoadingMessage = props.renderLoadingMessage,
	                    renderErrorMessage = props.renderErrorMessage;


	                if (error) {
	                    return renderErrorMessage(error);
	                }

	                return stage === 'LOADED' ? page.createElement(getCustomProps(props)) : renderLoadingMessage();
	            }
	        });

	        PageComponent.propTypes = {
	            initialState: PropTypes.object,
	            request: PropTypes.object,
	            renderLoadingMessage: PropTypes.func,
	            renderErrorMessage: PropTypes.func
	        };

	        PageComponent.defaultProps = {
	            initialState: null,
	            request: {},
	            renderLoadingMessage: function renderLoadingMessage() {
	                return React.createElement(
	                    'div',
	                    null,
	                    'loading...'
	                );
	            },
	            renderErrorMessage: function renderErrorMessage(error) {
	                return React.createElement(
	                    'div',
	                    null,
	                    error.message
	                );
	            }
	        };

	        function getCustomProps(props) {

	            var result = {};

	            /* eslint-disable fecs-use-for-of */
	            for (var name in props) {
	                if (hasOwn.call(props, name) && !(name in PageComponent.propTypes)) {
	                    result[name] = props[name];
	                }
	            }
	            /* eslint-enable fecs-use-for-of */

	            return result;
	        }

	        return PageComponent;
	    }

	    module.exports = createPageComponent;
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./App": 9,
		"./App.js": 9,
		"./Container": 5,
		"./Container.js": 5,
		"./Emitter": 6,
		"./Emitter.js": 6,
		"./Page": 10,
		"./Page.js": 10,
		"./Router": 11,
		"./Router.js": 11,
		"./actionCreator/page": 1,
		"./actionCreator/page.js": 1,
		"./component/Page": 12,
		"./component/Page.js": 12,
		"./env": 13,
		"./env.js": 13,
		"./events": 2,
		"./events.js": 2,
		"./index": 14,
		"./index.js": 14,
		"./middleware/pageActionEventProxy": 15,
		"./middleware/pageActionEventProxy.js": 15,
		"./resource": 16,
		"./resource.js": 16,
		"./util/assign": 3,
		"./util/assign.js": 3,
		"./util/createAppComponent": 17,
		"./util/createAppComponent.js": 17,
		"./util/createPageComponent": 18,
		"./util/createPageComponent.js": 18,
		"./util/guid": 4,
		"./util/guid.js": 4,
		"./util/invariant": 7,
		"./util/invariant.js": 7
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 20;


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ }
/******/ ])
});
;