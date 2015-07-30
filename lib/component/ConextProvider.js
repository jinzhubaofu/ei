/**
 * @file ContextProvider
 *
 * @author Leon(leon@outlook.com)
 * @requires react
 */

var React = require('react');

/**
 * ei上下文提供组件
 *
 *
 * 此模块主要用于提供React组件的`context`环境
 * 凡在`ContextProvider`中的组件，都可以通过向`contextTypes`添加`ei`属性来获得`context`的访问权限
 *
 * 在`ei`属性中，我们提供了`store`和`dispatch`两个接口
 * 分别用来获取`store`数据和发送`action`
 *
 * @class
 * @extends ReactComponent
 */
var ContextProvider = React.createClass(/** @lends ContextProvider.prototype */ {


    /**
     * 子控件上下文属性类型描述符
     *
     * @type {Object}
     */
    childContextTypes: {
        ei: React.PropTypes.object.isRequired
    },

    /**
     * `ContextProvider`实例化参数类型描述符
     *
     * `ContextProvider`组件必须包含有一个ei属性
     *
     * @type {Object}
     */
    propTypes: {
        ei: React.PropTypes.object.isRequired
    },

    /**
     * 获取子控件上下文
     *
     * @protected
     * @return {Object}
     */
    getChildContext: function () {

        return {
            ei: this.props.ei
        };

    },

    /**
     * 渲染
     *
     * @return {ReactElement}
     */
    render: function () {

        var ei = this.props.ei;

        return this.props.children(
            ei.store,
            ei.dispatch
        );

    }


});

module.exports = ContextProvider;
