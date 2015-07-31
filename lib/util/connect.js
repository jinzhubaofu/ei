/**
 * @file 包裹React组件，返回一个新组件，新组件可以访问`ei`上下文，从而提供`store`数据和`dispatch`方法
 *
 * 原理是使用high order组件
 *
 * @author Leon(leon@outlook.com)
 *
 * @requires react
 * @requires underscore
 */

var React = require('react');
var u = require('underscore');

var ContextConnector = require('../component/ContextConnector');
var bindActions = require('./bindActions');
var bindSelectors = require('./bindSelectors');

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

    var ContextFixer = React.createClass({

        displayName: 'ContextFixer',

        select: bindSelectors(selector),

        render: function () {

            var props = this.props;

            return React.createElement(

                ContextConnector,

                {
                    select: this.select
                },

                function (state, dispatch) {
                    return React.createElement(
                        Component,
                        u.extend(
                            {},
                            state,
                            props,
                            actions ? bindActions(dispatch, actions) : null
                        )
                    );
                }

            );

        }

    });

    return ContextFixer;

}

module.exports = connect;
