define('ei/util/bindSelectors', [
    'require',
    'exports',
    'module',
    'underscore',
    './invariant'
], function (require, exports, module) {
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