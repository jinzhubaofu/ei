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
        getDataFromContext: function () {
            return this.props.select(this.context.ei.store);
        },
        getInitialState: function () {
            return { data: this.getDataFromContext() };
        },
        componentDidMount: function () {
            this.context.ei.addChangeListener(this.onStoreChange);
        },
        componentWillUnmount: function () {
            this.context.ei.removeChangeListener(this.onStoreChange);
        },
        shouldComponentUpdate: function (nextProps, nextState) {
            return this.state.data !== nextState;
        },
        onStoreChange: function () {
            this.setState({ data: this.getDataFromContext() });
        },
        render: function () {
            return this.props.children(this.state.data, this.context.ei.dispatch);
        }
    });
    module.exports = ContextConnector;
});