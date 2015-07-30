/**
 * @file 动作工厂便利小工具 暂不开放
 * @ignore
 * @author Leon(leon@outlook.com)
 * @module ActionCreator
 */


var u = require('underscore');

var ACTION_ATTR = 'EI_ACTION_TAG';
var ACTION_TAG = 'EI_ACTION';


/**
 * 生成一个Action工厂函数
 *
 * @inner
 *
 * @param {string} type action类型
 * @param {?Function} factory 工厂函数
 *
 * @return {Function}
 */
function createFactory(type, factory) {

    function ActionCreator(payload) {

        var action = u.isFunction(factory) ? factory.apply(null, arguments) : {};

        action.type = type;

        return action;

    }

    // 给工厂函数添加一个标识
    ActionCreator[ACTION_ATTR] = ACTION_TAG;

    ActionCreator.type = type;

    return ActionCreator;

}

/**
 * 生成一个ActionCreator
 *
 * @method module:ActionCreator.extend
 *
 * @param {string} type 类型
 * @param {Function} factory 工厂函数
 *
 * @return {Function}
 */
exports.extend = function (type, factory) {

    if (!u.isString(type)) {
        throw new Error('Action Creator must have a type');
    }

    // 我们提供一个很简单的工厂函数
    return createFactory(type, factory);
};

/**
 * 是否为一个ActionCreator
 *
 * @param {*} action 待判断的对象
 * @return {boolean}
 */
exports.is = function (action) {
    return action && action[ACTION_ATTR] === ACTION_TAG;
};

