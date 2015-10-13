define('ei/component/ContextConnector', [
    'require',
    'exports',
    'module',
    'react'
], function (require, exports, module) {
    var React = require('react');
    var ContextConnector = React.createClass({
        displayName: 'ContextConnector',
        contextTypes: { ei: React.PropTypes.object.isRequired },
        propTypes: {
            children: React.PropTypes.func.isRequired,
            select: React.PropTypes.func.isRequired
        },
        getDataFromContext: function getDataFromContext() {
            return this.props.select(this.context.ei.store);
        },
        getInitialState: function getInitialState() {
            return { data: this.getDataFromContext() };
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
            this.setState({ data: this.getDataFromContext() });
        },
        render: function render() {
            return this.props.children(this.state.data, this.context.ei.dispatch);
        }
    });
    module.exports = ContextConnector;
});