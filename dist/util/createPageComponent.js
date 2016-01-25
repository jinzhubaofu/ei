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
    var hasOwn = Object.prototype.hasOwnProperty;
    function createPageComponent(Page) {
        function getCustomProps(props) {
            var result = {};
            for (var _name in props) {
                if (hasOwn.call(props, _name) && !(_name in PageComponent.propTypes)) {
                    result[_name] = props[_name];
                }
            }
            return result;
        }
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
                if (request !== nextRequest) {
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
                            error: error,
                            stage: 'LOADED'
                        });
                    }
                });
            },
            render: function render() {
                var page = this.page;
                var props = this.props;
                var _state = this.state;
                var error = _state.error;
                var stage = _state.stage;
                var renderLoadingMessage = props.renderLoadingMessage;
                var renderErrorMessage = props.renderErrorMessage;
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
                return React.createElement('div', null, 'loading...');
            },
            renderErrorMessage: function renderErrorMessage(error) {
                return React.createElement('div', null, error.message);
            }
        };
        return PageComponent;
    }
    module.exports = createPageComponent;
});