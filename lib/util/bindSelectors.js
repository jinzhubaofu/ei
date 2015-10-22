/**
 * @file 合成`store`选择器
 * @author Leon(leon@outlook.com)
 */

var u = require('underscore');

var invariant = require('./invariant');

/**
 * 将若干个数据选择器绑定到一个`store`上
 *
 * @private
 * @param {*}       selectors 选择器map
 * @param {!Object} store     数据仓库
 * @return {Function}
 */
function bindSelectors(selectors) {

    return function (store, props) {

        invariant(store, 'need store');

        switch (typeof selectors) {

            case 'function':

                return selectors(store, props);

            case 'object':

                return u
                    .chain(selectors)
                    .pick(u.isFunction)
                    .reduce(
                        function (result, select, name) {
                            result[name] = select(store[name], props);
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

    };



}

module.exports = bindSelectors;
