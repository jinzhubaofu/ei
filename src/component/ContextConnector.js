/**
 * @file 可访问`ei`上下文的组件
 * @author Leon(leon@outlook.com)
 * @requires react
 */

const React = require('react');

const bindActions = require('../util/bindActions');
const bindSelectors = require('../util/bindSelectors');

/**
 * `ei`上下文连接组件
 *
 * 凡是在`ContextProvider`中的组件都可以通过被此组件包裹后，获得到对`ei`上下文的访问功能
 *
 * @constructor
 */
const ContextConnector = React.createClass({

    getInitialState() {

        const {props, context} = this;

        const {selector, actions} = props;

        this.select = bindSelectors(selector);
        this.actions = bindActions(context.store.dispatch, actions);

        return {
            data: this.getDataFromContext(context)
        };

    },

    getDataFromContext(context) {
        return this.select(context.store.store, this.props.originProps);
    },

    componentDidMount() {
        this.context.store.addChangeListener(this.onStoreChange);
    },

    componentWillUnmount() {
        this.context.store.removeChangeListener(this.onStoreChange);
    },

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data !== nextState;
    },

    onStoreChange() {
        this.setState({
            data: this.getDataFromContext(this.context)
        });
    },

    render() {

        const {originComponent, originProps} = this.props;

        return React.createElement(
            originComponent,
            {
                // 原有的属性
                ...originProps,
                // 动作们
                ...this.actions,
                // 选中 store 中的数据们
                ...this.state.data
            }
        );

    }

});

const PropTypes = React.PropTypes;

ContextConnector.contextTypes = {
    store: PropTypes.object.isRequired
};

ContextConnector.propTypes = {
    actions: PropTypes.object,
    originComponent: PropTypes.func.isRequired,
    originProps: PropTypes.object.isRequired
};

module.exports = ContextConnector;
