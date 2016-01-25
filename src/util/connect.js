/**
 * @file 包裹React组件，返回一个新组件，新组件可以访问`ei`上下文，从而提供`store`数据和`dispatch`方法
 *
 * 原理是使用high order组件
 *
 * @author Leon(leon@outlook.com)
 *
 * @requires react
 */

const React = require('react');

const ContextConnector = require('../component/ContextConnector');


/**
 * 使用high order方法，包装一个组件，使它具体连接到context的能力
 *
 * @method module:ei.connect
 * @param {!ReactComponent}      Component 指定的组件
 * @param {*}                    selector  数据选择器，支持多种方式选择数据
 * @param {?Map<string, Object>} actions   名称 - ActionCreator
 * @return {ReactComponent}
 */
function connect(Component, selector, actions) {

    return function SelectorAndActionBinder(props) {
        return (
            <ContextConnector
                selector={selector}
                actions={actions}
                originComponent={Component}
                originProps={props} />
        );
    };

}

module.exports = connect;
