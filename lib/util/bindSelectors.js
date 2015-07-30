/**
 * @file 合成`store`选择器
 * @author Leon(leon@outlook.com)
 */

var u = require('underscore');

/**
 * 将若干个`store`数据选择器绑定到一个`store`上
 *
 * @private
 * @param {!Map<string, Function>} selectors 选择器map
 * @param {!Object}                store     数据仓库
 * @return {Function}
 */
function bindSelectors(selectors, store) {

    switch (typeof selectors) {

        case 'object':
            return u
                .chain(selectors)
                .pick(u.isFunction)
                .reduce(
                    function (result, select, name) {
                        result[name] = select(store[name]);
                        return result;
                    },
                    {}
                )
                .value();

        case 'number': case 'string':
            return store[selectors];

        case 'boolean':
            return selectors ? store : {};

        default:
            return {};

    }

}

module.exports = bindSelectors;
