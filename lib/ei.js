/* ei@2.0.0-alpha.3 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('react-redux'), require('redux')) :
	typeof define === 'function' && define.amd ? define('ei', ['exports', 'react', 'prop-types', 'react-redux', 'redux'], factory) :
	(factory((global.ei = {}),global.React,global.PropTypes,global.reactRedux,global.redux));
}(this, (function (exports,React,PropTypes,reactRedux,redux) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;
PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









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



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * @file Emitter
 * @author Leon(leon@outlook.com)
 */

var EMITTER_LISTENER_POOL_ATTR = '__listeners__';
var EMITTER_CURRENT_EVENT_ATTR = '__event__';

var Emitter = function () {
    function Emitter() {
        classCallCheck(this, Emitter);
    }

    /**
     * 添加事件处理函数
     *
     * @public
     * @param {!string} name 事件名称
     * @param {!Function} handler 事件处理函数
     * @return {module:Emitter}
     */
    Emitter.prototype.on = function on(name, handler) {

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
    };

    /**
     * 取消事件处理
     *
     * @public
     * @param {?string} name 事件名称
     * @param {?Function} handler 事件处理函数
     * @return {module:Emitter}
     */


    Emitter.prototype.off = function off(name, handler) {

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
    };

    /**
     * 添加一个只回调一次的事件处理函数
     *
     * @public
     * @param {!string} name 事件类型
     * @param {!Function} handler 事件处理函数
     * @return {module:Emitter}
     */


    Emitter.prototype.once = function once(name, handler) {

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
    };

    /**
     * 释放事件
     *
     * @public
     * @param {string} name 事件名称
     * @param {...*}   args 事件附带参数
     * @return {module:Emitter}
     */


    Emitter.prototype.emit = function emit(name) {

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
    };

    /**
     * 获取当前正在派发的事件
     *
     * @public
     * @return {?string}
     */


    Emitter.prototype.getCurrentEvent = function getCurrentEvent() {
        return this[EMITTER_CURRENT_EVENT_ATTR];
    };

    /**
     * 销毁所有的事件
     *
     * @public
     * @return {module:Emitter}
     */


    Emitter.prototype.destroyEvents = function destroyEvents() {

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
    };

    return Emitter;
}();

/**
 * @file ei系统消息总线
 * @author Leon(leon@outlook.com)
 * @module events
 */

var events = new Emitter();

/**
 * @file Router
 * @author Leon(leon@outlook.com)
 */

var Router = function () {

    /**
     * 简易的路由器
     *
     * @constructor Router
     * @param {Array.<Object>} routes 路由配置
     */
    function Router() {
        var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        classCallCheck(this, Router);

        this.routes = routes;
    }

    /**
     * 对一个请求进行路由
     *
     * @param {!Object} request 请求对象
     * @return {?Object}
     */


    Router.prototype.route = function route(request) {
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


    Router.prototype.addRoute = function addRoute(config) {
        this.routes.push(config);
        return this;
    };

    return Router;
}();

/**
 * @file 环境探测
 * @author Leon(leon@outlook.com)
 * @module env
 * @inner
 */

/**
 * 是否为服务器端环境
 *
 * @member {boolean}
 */
var isServer = false;

/**
 * 是否为客户端环境
 *
 * @member {boolean}
 */
var isClient = false;

try {
    isServer = 'object' === (typeof process === 'undefined' ? 'undefined' : _typeof(process)) && Object.prototype.toString.call(process) === '[object process]';
    isClient = !isServer;
} catch (e) {
    isClient = true;
}

/**
 * @file es6 Object.assign polyfill
 * @author leon(ludafa@outlook.com)
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

var assign = Object.assign || function (target) {

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

/**
 * @file create app component
 * @author leon(ludafa@outlook.com)
 */

function createAppComponent(App) {
    var AppComponent = function (_PureComponent) {
        inherits(AppComponent, _PureComponent);

        function AppComponent() {
            classCallCheck(this, AppComponent);

            var _this = possibleConstructorReturn(this, _PureComponent.call(this));

            var _this$props = _this.props,
                routes = _this$props.routes,
                router = _this$props.router,
                app = _this$props.app;


            _this.app = app || new App({ routes: routes, router: router });

            _this.state = {};

            return _this;
        }

        AppComponent.prototype.getChildContext = function getChildContext() {

            var app = this.app;

            return {
                route: function route(request) {
                    return app.route(request);
                },
                loadPage: function loadPage(pageModuleId) {
                    return app.loadPage(pageModuleId);
                }
            };
        };

        AppComponent.prototype.render = function render() {
            return this.props.children;
        };

        return AppComponent;
    }(React.PureComponent);

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

/**
 * @file App
 * @author Leon(leon@outlook.com)
 */

/* eslint-disable fecs-prefer-class */

/**
 * App
 *
 * @constructor
 * @param {!Object} options 参数
 * @param {Array.Object} options.routes 路由配置
 */

var App = function () {
    function App() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, App);


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


    App.prototype.execute = function execute(request, needRawState) {

        invariant(isServer, 'App.execute() must run on server');

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


    App.prototype.setBasePath = function setBasePath(basePath) {
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


    App.prototype.loadPage = function loadPage(page) {
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

        var loadMethodName = isServer ? 'resolveServerModule' : 'resolveClientModule';

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


    App.prototype.resolvePage = function resolvePage(Page) {

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


    App.prototype.resolveServerModule = function resolveServerModule(moduleId) {
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

                /* eslint-disable */
                var Page = require(path);
                /* eslint-enable */

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


    App.prototype.resolveClientModule = function resolveClientModule(moduleId) {

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


    App.prototype.route = function route(request) {

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

    return App;
}();

App.Component = createAppComponent(App);

/**
 * @file page init action creator
 * @author leon(ludafa@outlook.com)
 */

var INIT = 'ei/INIT';

function init(payload) {
    return {
        type: INIT,
        payload: payload
    };
}

var REPLACE = 'ei/REPLACE';

function replace(payload) {
    return {
        type: REPLACE,
        payload: payload
    };
}

/**
 * @file guid
 * @author leon(ludafa@outlook.com)
 */

var guid = function () {
  return Math.random().toString(36).substr(2, 12);
};

/**
 * @file 可进行路由的 Page
 * @author leon(ludafa@outlook.com)
 */

var ASYNC_PAGE_LOAD_ATTR = 'ASYNC_PAGE_LOAD_ATTR';

/* eslint-disable fecs-prefer-class */

var Page$2 = function (_PureComponent) {
    inherits(Page, _PureComponent);

    function Page() {
        var _temp, _this, _ret;

        classCallCheck(this, Page);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = {
            pendding: false,
            ready: false,
            error: null
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    Page.prototype.componentDidMount = function componentDidMount() {
        var _props = this.props,
            initialState = _props.initialState,
            request = _props.request;

        this.renderPage(request, initialState);
    };

    Page.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

        var request = this.props.request || {};
        var pathname = request.pathname,
            search = request.search;

        var nextRequest = nextProps.request;

        if (request !== nextRequest && (pathname !== nextRequest.pathname || search !== nextRequest.search)) {
            this.renderPage(nextRequest, null);
        }
    };

    Page.prototype.renderPage = function renderPage(request, initialState) {
        var _this2 = this;

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
            if (token === _this2[ASYNC_PAGE_LOAD_ATTR]) {
                _this2.setState({
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
            if (token === _this2[ASYNC_PAGE_LOAD_ATTR]) {
                _this2.setState({
                    error: error,
                    ready: false,
                    pendding: false,
                    Page: null
                });
            }
        });
    };

    Page.prototype.onRedirect = function onRedirect(action) {

        var onRedirect = this.props.onRedirect;

        if (onRedirect) {
            onRedirect(action);
            return;
        }

        this.renderPage(action.payload.location);
    };

    Page.prototype.render = function render() {
        var _props2 = this.props,
            request = _props2.request,
            renderLoadingMessage = _props2.renderLoadingMessage,
            renderErrorMessage = _props2.renderErrorMessage,
            rest = objectWithoutProperties(_props2, ['request', 'renderLoadingMessage', 'renderErrorMessage']);
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
                    content = React__default.createElement(Page.Component, _extends({}, rest, {
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

        return React__default.createElement(
            'div',
            { className: 'ui-page state-' + state },
            content
        );
    };

    return Page;
}(React.PureComponent);

Page$2.displayName = 'Page';
Page$2.contextTypes = {
    route: PropTypes.func,
    loadPage: PropTypes.func
};
Page$2.propTypes = {
    request: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        query: PropTypes.object,
        search: PropTypes.string
    }),
    initialState: PropTypes.any,
    renderLoadingMessage: PropTypes.func,
    renderErrorMessage: PropTypes.func
};
Page$2.defaultProps = {
    renderErrorMessage: function renderErrorMessage(error) {
        return React__default.createElement(
            'span',
            null,
            error.message
        );
    },
    renderLoadingMessage: function renderLoadingMessage() {
        return React__default.createElement(
            'span',
            null,
            'loading...'
        );
    }
};

/**
 * @file page action event proxy
 * @author leon(ludafa@outlook.com)
 */

var pageActionEventProxy = function (page) {

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

/**
 * @file create a component class for Page
 * @author leon(ludafa@outlook.com)
 */

var PAGE_GET_INITIAL_STATE_GUID_ATTR = 'PAGE_GET_INITIAL_STATE_GUID_ATTR';
var hasOwn = Object.prototype.hasOwnProperty;

function createPageComponent(Page) {
    var PageComponent = function (_PureComponent) {
        inherits(PageComponent, _PureComponent);

        function PageComponent() {
            classCallCheck(this, PageComponent);

            var _this = possibleConstructorReturn(this, _PureComponent.call(this));

            var initialState = _this.props.initialState;


            var page = _this.page = new Page(initialState);

            // 添加事件代理
            page.on('*', function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                var eventName = page.getCurrentEvent().split(/[\-_]/).map(function (term) {
                    return term.charAt(0).toUpperCase() + term.slice(1).toLowerCase();
                }).join('');

                var handler = _this.props['on' + eventName];

                if (typeof handler === 'function') {
                    handler.apply(_this, args);
                }
            });

            _this.state = {
                stage: initialState == null ? 'INITED' : 'LOADED',
                error: null
            };

            return _this;
        }

        PageComponent.prototype.componentDidMount = function componentDidMount() {
            var handleRequest = this.handleRequest,
                page = this.page,
                props = this.props;

            var stage = this.state.stage;

            if (stage === 'LOADED') {
                return;
            }

            handleRequest(page, props.request);
        };

        PageComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var request = this.props.request;
            var nextRequest = nextProps.request;

            if (request !== nextRequest) {
                this.handleRequest(this.page, nextRequest);
            }
        };

        PageComponent.prototype.componentWillUnmount = function componentWillUnmount() {
            var page = this.page;
            if (page) {
                page.dispose();
            }
            this.page = null;
        };

        PageComponent.prototype.handleRequest = function handleRequest(page, request) {
            var _this2 = this;

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
                if (token === _this2[PAGE_GET_INITIAL_STATE_GUID_ATTR]) {
                    _this2.setState({
                        stage: 'LOADED'
                    });
                }
            }, function (error) {

                // 如果不是一致的（也就是在这次请求之后又发生了一次请求，token 就更新了），就算球了~
                if (token === _this2[PAGE_GET_INITIAL_STATE_GUID_ATTR]) {
                    _this2.setState({
                        error: error,
                        stage: 'LOADED'
                    });
                }
            });
        };

        PageComponent.prototype.render = function render() {
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
        };

        return PageComponent;
    }(React.PureComponent);

    PageComponent.displayName = 'PageComponent';


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
            return React__default.createElement(
                'div',
                null,
                'loading...'
            );
        },
        renderErrorMessage: function renderErrorMessage(error) {
            return React__default.createElement(
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

/**
 * @file 页面
 * @author Leon(leon@outlook.com)
 *
 * @requires react
 */

var Page = function (_Emitter) {
    inherits(Page, _Emitter);

    /**
     * 页面
     *
     * @constructor
     * @param {*} initialState 初始数据状态
     */


    /**
     * 生成Page子类
     *
     * @param {!Object} proto 扩展Page的配置
     * @return {Function}
     */
    function Page(initialState) {
        classCallCheck(this, Page);

        var _this = possibleConstructorReturn(this, _Emitter.call(this));

        _this.middlewares = [pageActionEventProxy];
        _this.initialize(initialState);
        return _this;
    }

    /**
     * 构造函数
     *
     * @param {*} initialState 初始数据
     */


    Page.prototype.initialize = function initialize(initialState) {
        var _this2 = this;

        this.id = guid();

        var reducer = this.reducer || this.constructor.reducer;

        if ((typeof reducer === 'undefined' ? 'undefined' : _typeof(reducer)) === 'object') {
            reducer = redux.combineReducers(this.reducer);
        }

        var enhancer = redux.compose;

        if (process.env.NODE_ENV !== 'production' && isClient && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
            enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                name: 'ei-page@' + this.id
            });
        }

        this.context = redux.createStore(function (state, action) {
            if (action.type === REPLACE) {
                return action.payload;
            }
            return reducer(state, action);
        }, initialState, enhancer(redux.applyMiddleware.apply(undefined, this.middlewares.map(function (middleware) {
            return middleware(_this2);
        }))));
    };

    /**
     * 初始化
     *
     * 此方法只会被调用一次
     *
     * 处理请求的过程中，在页面实例化后，会被调用到此方法
     *
     * 此方法会派发一个init动作，并附带有getInitialState方法所返回的数据
     *
     * init动作提供给页面的初始数据剪裁的时机
     *
     * 但是只有在execute的情况下才会被调用，
     * 我们在bootstrap时传入的initialState是已经是剪裁好的数据
     * 也就是在server端预渲染后向client端同步数据状态的场景
     *
     *
     * @TODO 通过page的stage来保证此动作只能触发一次
     *
     * @public
     * @param {*} initialState 初始状态
     * @return {module:Page}
     */


    Page.prototype.init = function init$$1(initialState) {
        this.dispatch(init(initialState));
        return this;
    };

    /**
     * 使用当前上下文中的数据，创建一个可提渲染使用的react元素
     *
     * @public
     *
     * @param {?Object} props 视图属性
     * @notice 此参数一般不需要使用，只有在 Page 作为子组件时使用
     * @return {ReactElement}
     */


    Page.prototype.createElement = function createElement(props) {

        var context = this.context;
        var View = this.view || this.constructor.view;

        return React__default.createElement(
            reactRedux.Provider,
            { store: context },
            React__default.createElement(View, props)
        );
    };

    /**
     * 返回当前上下文中的所有数据
     *
     * 此方法用于将服务器端的页面数据，同步到客户端上
     *
     * @public
     *
     * @return {*}
     */


    Page.prototype.getState = function getState() {
        return this.context.getState();
    };

    /**
     * 设置当前上下文中的所有数据
     *
     * @param {*} state 数据
     * @return {module:Page}
     */


    Page.prototype.setState = function setState(state) {
        this.context.dispatch(replace(state));
        return this;
    };

    /**
     * 派发一个动作，激活相应的数据剪切和视图更新
     *
     * @public
     *
     * @method module:Page#dispatch
     *
     * @param {(Object | Function)} action 动作
     *
     * @return {Object}
     *
     * @fires module:events~page-dispatch
     */


    Page.prototype.dispatch = function dispatch(action) {

        /**
         * @event module:events~page-dispatch
         * @param {(Object | Function)} action 动作
         */
        events.emit('page-dispatch', action);

        this.emit('dispatch', action);

        this.context.dispatch(action);

        return action;
    };

    /**
     * 获取页面初始数据
     *
     * 页面在启动时，一般都会需要通过操作资源来获取数据作为初始数据
     *
     * 并且，这个过程一般还需要使用当前`请求`来完成决策
     *
     * 在app中接收到请求后会加载路由中指定的Page模块，将其实例化后，执行此方法
     *
     * @todo page需要有一个状态标识，new / inited / rendered / disposed
     *
     * @public
     *
     * @param {Object} request 请求
     *
     * @return {Promise}
     */


    Page.prototype.getInitialState = function getInitialState(request) {
        return {};
    };

    /**
     * 销毁页面
     *
     * @return {module:Page}
     */


    Page.prototype.dispose = function dispose() {

        /**
         * @event module:event~page-dispose
         */
        events.emit('page-dispose');

        this.emit('dispose');

        // @TODO 补充销毁时的必要处理

        return this;
    };

    return Page;
}(Emitter);

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

    var SubPage = function (_Page) {
        inherits(SubPage, _Page);

        function SubPage() {
            classCallCheck(this, SubPage);
            return possibleConstructorReturn(this, _Page.apply(this, arguments));
        }

        return SubPage;
    }(Page);

    assign(SubPage.prototype, proto);

    SubPage.Component = createPageComponent(SubPage);

    return SubPage;
};

Page.Component = Page$2;

/**
 * @file bean container copy from inverse
 * @author Leon(leon@outlook.com)
 */

var Container = function () {

    /**
     * IOC窗口
     *
     * @constructor Container
     */
    function Container() {
        classCallCheck(this, Container);

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


    Container.prototype.make = function make(name) {

        /* eslint-disable prefer-rest-params */

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

        /* eslint-enable prefer-rest-params */
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


    Container.prototype.bind = function bind(name, factory) {
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


    Container.prototype.singleton = function singleton(name, factory) {
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


    Container.prototype.register = function register(name, object) {
        this.registeredObjects[name] = object;
        return this;
    };

    return Container;
}();

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
function register(type, resource) {
  container.register(type, resource);
  return this;
}

/**
 * 获取一个资源操作对象
 *
 * @method module:Resource.get
 *
 * @param {!string} type 资源标识符
 *
 * @return {(Object | Function)}
 */
function get$1(type) {
  return container.make(type);
}

var resource = Object.freeze({
	register: register,
	get: get$1
});

/**
 * @file ei主入口
 * @author Leon(leon@outlook.com)
 * @module ei
 */

var actionTypes = {
    INIT: INIT,
    REPLACE: REPLACE
};

var actions = {
    init: init,
    replace: replace
};

exports.App = App;
exports.Page = Page;
exports.Container = Container;
exports.events = events;
exports.resource = resource;
exports.actionTypes = actionTypes;
exports.actions = actions;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ei.js.map
