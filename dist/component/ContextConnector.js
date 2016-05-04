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
            var selector = props.selector;
            var actions = props.actions;
            this.select = bindSelectors(selector);
            this.actions = bindActions(context.ei.dispatch, actions);
            return { data: this.getDataFromContext(context) };
        },
        getDataFromContext: function getDataFromContext(context) {
            return this.select(context.ei.store, this.props.originProps);
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
            var originComponent = _props.originComponent;
            var originProps = _props.originProps;
            return React.createElement(originComponent, babelHelpers._extends({}, originProps, this.actions, this.state.data));
        }
    });
    var PropTypes = React.PropTypes;
    ContextConnector.contextTypes = { ei: PropTypes.object.isRequired };
    ContextConnector.propTypes = {
        actions: PropTypes.object,
        originComponent: PropTypes.func.isRequired,
        originProps: PropTypes.object.isRequired
    };
    module.exports = ContextConnector;
});