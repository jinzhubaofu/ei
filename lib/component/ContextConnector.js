/**
 * @file 可访问`ei`上下文的组件
 * @author Leon(leon@outlook.com)
 * @requires react
 */

var React = require('react');

/**
 * `ei`上下文连接组件
 *
 * 凡是在`ContextProvider`中的组件都可以通过被此组件包裹后，获得到对`ei`上下文的访问功能
 *
 * @constructor
 */
var ContextConnector = React.createClass({

    displayName: 'ContextConnector',

    contextTypes: {
        ei: React.PropTypes.object.isRequired
    },

    propTypes: {
        children: React.PropTypes.func.isRequired,
        select: React.PropTypes.func.isRequired
    },

    getDataFromContext: function () {
        return this.props.select(this.context.ei.store);
    },

    getInitialState: function () {
        return {
            data: this.getDataFromContext()
        };
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
        this.setState({
            data: this.getDataFromContext()
        });
    },

    render: function () {

        return this.props.children(this.state.data, this.context.ei.dispatch);

    }

});

module.exports = ContextConnector;
