define('ei/component/ContextConnector', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'underscore',
    '../util/bindActions',
    '../util/bindSelectors'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var u = require('underscore');
    var bindActions = require('../util/bindActions');
    var bindSelectors = require('../util/bindSelectors');
    var ContextConnector = function (_React$Component) {
        babelHelpers.inherits(ContextConnector, _React$Component);
        function ContextConnector(props, context) {
            babelHelpers.classCallCheck(this, ContextConnector);
            babelHelpers.get(Object.getPrototypeOf(ContextConnector.prototype), 'constructor', this).call(this, props);
            this.onStoreChange = u.bind(this.onStoreChange, this);
            this.select = bindSelectors(props.selector);
            this.state = { data: this.getDataFromContext(context) };
        }
        babelHelpers.createClass(ContextConnector, [
            {
                key: 'getDataFromContext',
                value: function getDataFromContext(context) {
                    return this.select(context.ei.store, this.props.children.props);
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.context.ei.addChangeListener(this.onStoreChange);
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.context.ei.removeChangeListener(this.onStoreChange);
                }
            },
            {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps, nextState) {
                    return this.state.data !== nextState;
                }
            },
            {
                key: 'onStoreChange',
                value: function onStoreChange() {
                    this.setState({ data: this.getDataFromContext(this.context) });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var children = _props.children;
                    var actions = _props.actions;
                    var data = this.state.data;
                    var dispatch = this.context.ei.dispatch;
                    actions = actions ? bindActions(dispatch, actions) : null;
                    return React.cloneElement(children, babelHelpers._extends({}, actions, data));
                }
            }
        ]);
        return ContextConnector;
    }(React.Component);
    var PropTypes = React.PropTypes;
    ContextConnector.contextTypes = { ei: PropTypes.object.isRequired };
    ContextConnector.propTypes = {
        children: PropTypes.element.isRequired,
        actions: PropTypes.object
    };
    module.exports = ContextConnector;
});