define('ei/component/Page', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../util/guid'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var guid = require('../util/guid');
    var ASYNC_PAGE_LOAD_ATTR = 'ASYNC_PAGE_LOAD_ATTR';
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
            var _props = this.props;
            var initialState = _props.initialState;
            var request = _props.request;
            this.renderPage(request, initialState);
        },
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            var _props$request = this.props.request;
            var request = _props$request === undefined ? {} : _props$request;
            var pathname = request.pathname;
            var search = request.search;
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
                        message: '\u554A\u54E6\uFF0C\u8FD9\u4E2A\u9875\u9762\u8FF7\u5931\u5728\u4E86\u832B\u832B\u5B87\u5B99\u4E2D\u3002\u3002\u3002'
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
                if (token === _this[ASYNC_PAGE_LOAD_ATTR]) {
                    _this.setState({
                        Page: Page,
                        error: null,
                        pendding: false,
                        ready: true
                    });
                }
            })['catch'](function (error) {
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
            var _props2 = this.props;
            var request = _props2.request;
            var renderLoadingMessage = _props2.renderLoadingMessage;
            var renderErrorMessage = _props2.renderErrorMessage;
            var rest = babelHelpers.objectWithoutProperties(_props2, [
                'request',
                'renderLoadingMessage',
                'renderErrorMessage'
            ]);
            var _state = this.state;
            var ready = _state.ready;
            var pendding = _state.pendding;
            var Page = _state.Page;
            var error = _state.error;
            var content = null;
            if (request != null) {
                if (error) {
                    content = renderErrorMessage(error);
                } else if (pendding) {
                    content = renderLoadingMessage();
                } else if (ready) {
                    try {
                        content = React.createElement(Page.Component, babelHelpers._extends({}, rest, {
                            onRedirect: this.onRedirect,
                            request: request
                        }));
                    } catch (e) {
                        content = renderErrorMessage(e);
                    }
                }
            }
            return React.createElement('div', { className: 'ui-page' }, content);
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
            return React.createElement('span', null, error.message);
        },
        renderLoadingMessage: function renderLoadingMessage() {
            return React.createElement('span', null, 'loading...');
        }
    };
    module.exports = Page;
});