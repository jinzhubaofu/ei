define('ei/component/ContextConnector', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../util/bindActions',
    '../util/bindSelectors'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var bindActions = require('../util/bindActions');
    var bindSelectors = require('../util/bindSelectors');
    var ContextConnector = React.createClass({
        displayName: 'ContextConnector',
        getInitialState: function getInitialState() {
            var props = this.props;
            var context = this.context;
            this.select = bindSelectors(props.selector);
            return { data: this.getDataFromContext(context) };
        },
        getDataFromContext: function getDataFromContext(context) {
            return this.select(context.ei.store, this.props.children.props);
        },
        componentDidMount: function componentDidMount() {
            this.context.ei.addChangeListener(this.onStoreChange);
        },
        componentWillUnmount: function componentWillUnmount() {
            this.context.ei.removeChangeListener(this.onStoreChange);
        },
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            return this.state.data !== nextState;
        },
        onStoreChange: function onStoreChange() {
            this.setState({ data: this.getDataFromContext(this.context) });
        },
        render: function render() {
            var _props = this.props;
            var children = _props.children;
            var actions = _props.actions;
            var data = this.state.data;
            var dispatch = this.context.ei.dispatch;
            actions = actions ? bindActions(dispatch, actions) : null;
            return React.cloneElement(children, babelHelpers._extends({}, actions, data));
        }
    });
    var PropTypes = React.PropTypes;
    ContextConnector.contextTypes = { ei: PropTypes.object.isRequired };
    ContextConnector.propTypes = {
        children: PropTypes.element.isRequired,
        actions: PropTypes.object
    };
    module.exports = ContextConnector;
});