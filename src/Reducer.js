/**
 * @file 剪裁器的便利小工具 暂不开放
 * @ignore
 * @author Leon(leon@outlook.com)
 * @module Reducer
 */

var u = require('underscore');

var Dispatcher = require('./Dispatcher');

var mixins = {

    /**
     * 绑定到一个ActionCreator
     *
     * @param {module:ActionCreator} ActionCreator Action创建器
     * @return {module:Reducer}
     */
    bindAction: function (ActionCreator) {
        Dispatcher.addActionListener(ActionCreator.type, this);
        return this;
    }

};

/**
 * 生成一个Reducer
 *
 * @param {Function} reducer reducer
 * @return {Function}
 */
exports.extend = function (reducer) {

    if (!u.isFunction(reducer)) {
        throw new Error('Reducer have be a function');
    }

    return u.extend(reducer, mixins);

};


/**
 * 合并reducer
 *
 * @param {Object} reducers 一堆reducer
 * @return {Function}
 */
exports.compose = function (reducers) {

    reducers = u.pick(reducers, u.isFunction);

    return function (state, action) {

        var hasChange = false;
        var nextState = {};

        for (var key in reducers) {

            if (u.has(reducers, key)) {

                var currentValue = nextState[key];
                var nextValue = reducers[key](currentValue, action);

                if (currentValue !== nextValue) {
                    nextState[key] = nextValue;
                    hasChange = true;
                }

            }

        }

        return hasChange ? nextState : state;

    };

};

