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

        this.select = bindSelectors(props.selector);

        return {
            data: this.getDataFromContext(context)
        };

    },

    getDataFromContext(context) {
        return this.select(context.ei.store, this.props.props);
    },

    componentDidMount() {
        this.context.ei.addChangeListener(this.onStoreChange);
    },

    componentWillUnmount() {
        this.context.ei.removeChangeListener(this.onStoreChange);
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

        let {originComponent, originProps, actions} = this.props;
        let {data} = this.state;
        let {dispatch} = this.context.ei;

        actions = actions ? bindActions(dispatch, actions) : null;

        return React.createElement(
            originComponent,
            {
                // 原有的属性
                ...originProps,
                // 动作们
                ...actions,
                // 选中 store 中的数据们
                ...data
            }
        );

    }

});

const {PropTypes} = React;

ContextConnector.contextTypes = {
    ei: PropTypes.object.isRequired
};

ContextConnector.propTypes = {
    actions: PropTypes.object,
    originComponent: PropTypes.func.isRequired,
    originProps: PropTypes.object.isRequired
};

module.exports = ContextConnector;
