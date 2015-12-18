define('ei/util/createPageComponent', [
    'require',
    'exports',
    'module',
    'react',
    '../util/guid'
], function (require, exports, module) {
    var React = require('react');
    var guid = require('../util/guid');
    var PropTypes = React.PropTypes;
    var PAGE_GET_INITIAL_STATE_GUID_ATTR = 'PAGE_GET_INITIAL_STATE_GUID_ATTR';
    function createPageComponent(Page) {
        var PageComponent = React.createClass({
            displayName: 'PageComponent',
            getInitialState: function getInitialState() {
                var me = this;
                var props = me.props;
                var initialState = props.initialState;
                var page = me.page = new Page(initialState);
                page.on('*', function () {
                    var eventName = page.getCurrentEvent().split(/[\-_]/).map(function (term) {
                        return term.charAt(0).toUpperCase() + term.slice(1).toLowerCase();
                    }).join('');
                    var handler = props['on' + eventName];
                    if (typeof handler === 'function') {
                        handler.apply(me, arguments);
                    }
                });
                return {
                    stage: initialState == null ? 'INITED' : 'LOADED',
                    error: null
                };
            },
            componentDidMount: function componentDidMount() {
                var handleRequest = this.handleRequest;
                var page = this.page;
                var props = this.props;
                var stage = this.state.stage;
                if (stage === 'LOADED') {
                    return;
                }
                handleRequest(page, props.request);
            },
            componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
                var request = this.props.request;
                var nextRequest = nextProps.request;
                var pathname = request.pathname;
                var search = request.search;
                if (nextRequest !== request && (pathname !== nextRequest.pathname || search !== nextRequest.search)) {
                    this.handleRequest(this.page, nextRequest);
                }
            },
            componentWillUnmount: function componentWillUnmount() {
                var page = this.page;
                if (page) {
                    this.page.dispose();
                    this.page = null;
                }
            },
            handleRequest: function handleRequest(page, request) {
                var _this = this;
                var token = this[PAGE_GET_INITIAL_STATE_GUID_ATTR] = guid();
                this.setState({
                    stage: 'LOADING',
                    error: null
                });
                Promise.resolve(page.getInitialState(request)).then(function (state) {
                    page.init(state);
                    if (token === _this[PAGE_GET_INITIAL_STATE_GUID_ATTR]) {
                        _this.setState({ stage: 'LOADED' });
                    }
                }, function (error) {
                    if (token === _this[PAGE_GET_INITIAL_STATE_GUID_ATTR]) {
                        _this.setState({
                            stage: 'LOADED',
                            error: error
                        });
                    }
                });
            },
            renderLoading: function renderLoading() {
                return this.props.renderLoading.call(this);
            },
            renderError: function renderError(error) {
                var renderError = this.props.renderError;
                return renderError.call(this, error);
            },
            render: function render() {
                var page = this.page;
                var _state = this.state;
                var error = _state.error;
                var stage = _state.stage;
                if (error) {
                    return this.renderError(error);
                }
                if (stage === 'LOADED') {
                    return page.createElement();
                }
                return this.renderLoading();
            }
        });
        PageComponent.propTypes = {
            initialState: PropTypes.object,
            request: PropTypes.object,
            renderLoadingHint: PropTypes.func,
            renderError: PropTypes.func
        };
        PageComponent.defaultProps = {
            initialState: null,
            request: {},
            renderLoading: function renderLoading() {
                return React.createElement('div', null, 'loading...');
            },
            renderError: function renderError(error) {
                return React.createElement('div', null, error.message);
            }
        };
        return PageComponent;
    }
    module.exports = createPageComponent;
});