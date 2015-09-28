define('ei/util/bindSelectors', [
    'exports',
    '../babelHelpers',
    'underscore',
    './invariant'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var u = require('underscore');
    var invariant = require('./invariant');
    function bindSelectors(selectors) {
        return function (store) {
            invariant(store, 'need store');
            switch (typeof selectors) {
            case 'function':
                return selectors(store);
            case 'object':
                return u.chain(selectors).pick(u.isFunction).reduce(function (result, select, name) {
                    result[name] = select(store[name]);
                    return result;
                }, {}).value();
            case 'number':
            case 'string':
                return store[selectors];
            case 'boolean':
                return selectors ? store : {};
            default:
                return {};
            }
        };
    }
    module.exports = bindSelectors;
});