define('ei/component/Page', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'es6-promise'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _es6Promise = require('es6-promise');
    var Page = function (_React$Component) {
        babelHelpers.inherits(Page, _React$Component);
        function Page(props) {
            babelHelpers.classCallCheck(this, Page);
            babelHelpers.get(Object.getPrototypeOf(Page.prototype), 'constructor', this).call(this, props);
            this.state = {
                pendding: false,
                ready: false,
                error: null
            };
        }
        babelHelpers.createClass(Page, [
            {
                key: 'render',
                value: function render() {
                    var _state = this.state;
                    var ready = _state.ready;
                    var page = _state.page;
                    var error = _state.error;
                    var content = '';
                    if (error) {
                        content = error.message;
                    } else if (ready) {
                        content = page.createElement();
                    } else {
                        content = this.renderLoading();
                    }
                    return _react2['default'].createElement('div', { className: 'ui-page' }, content);
                }
            },
            {
                key: 'renderLoading',
                value: function renderLoading() {
                    return _react2['default'].createElement('span', null, 'loading...');
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _props = this.props;
                    var initialState = _props.initialState;
                    var request = _props.request;
                    var app = this.context.app;
                    this.renderPage(app, request, initialState);
                }
            },
            {
                key: 'renderPage',
                value: function renderPage(app, request, initialState) {
                    var _this = this, _arguments = arguments;
                    var currentPage = this.state.page;
                    this.setState({
                        pendding: true,
                        error: null
                    });
                    var route = app.route(request);
                    if (!route) {
                        this.setState({
                            ready: false,
                            error: { status: 404 },
                            pendding: false,
                            page: null
                        });
                        return;
                    }
                    app.loadPage(route.page).then(function (Page) {
                        var page = undefined;
                        if (currentPage && currentPage instanceof Page) {
                            page = currentPage;
                        } else {
                            page = new Page();
                            page.on('*', function () {
                                var eventName = page.getCurrentEvent().split(/[\-_]/).map(function (term) {
                                    return term.charAt(0).toUpperCase() + term.slice(1).toLowerCase();
                                }).join('');
                                var handlerName = 'on' + eventName;
                                var handler = _this.props[handlerName];
                                if (typeof handler === 'function') {
                                    handler.apply(null, _arguments);
                                }
                            });
                        }
                        page.route = route;
                        return page;
                    }).then(function (page) {
                        if (initialState) {
                            page.setState(initialState);
                            return page;
                        }
                        return _es6Promise.Promise.resolve(page.getInitialState(request)).then(function (state) {
                            page.init(state);
                            return page;
                        });
                    }).then(function (page) {
                        if (currentPage && currentPage !== page) {
                            currentPage.dispose();
                        }
                        _this.setState({
                            page: page,
                            ready: true,
                            pendding: false,
                            error: null
                        });
                    })['catch'](function (error) {
                        _this.setState({
                            error: error,
                            ready: false,
                            pendding: false,
                            page: null
                        });
                    });
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var request = this.props.request;
                    var nextRequest = nextProps.request;
                    if (request.pathname !== nextRequest.pathname || request.search !== nextRequest.search) {
                        this.renderPage(this.context.app, nextRequest, null);
                    }
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    var page = this.state.page;
                    if (page) {
                        page.dispose();
                    }
                }
            }
        ]);
        return Page;
    }(_react2['default'].Component);
    var PropTypes = _react2['default'].PropTypes;
    Page.contextTypes = { app: PropTypes.object.isRequired };
    Page.propTypes = {
        request: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
            query: PropTypes.object,
            search: PropTypes.string
        }).isRequired,
        initialState: PropTypes.any
    };
    exports['default'] = Page;
    module.exports = exports['default'];
});