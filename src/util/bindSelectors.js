/**
 * @file 合成`store`选择器
 * @author Leon(leon@outlook.com)
 */

const invariant = require('./invariant');

const toString = Object.prototype.toString;

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

        switch (toString.call(selectors).slice(8, -1).toLowerCase()) {

            case 'function':
                return selectors(store, props);

            case 'object':

                return Object
                    .keys(selectors)
                    .reduce(
                        function (result, name) {
                            const select = selectors[name];
                            if (typeof select === 'function') {
                                result[name] = select(store[name], props);
                            }
                            return result;
                        },
                        {}
                    );

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
