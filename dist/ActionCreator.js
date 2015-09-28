define('ei/ActionCreator', [
    'exports',
    './babelHelpers',
    'underscore'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var u = require('underscore');
    var ACTION_ATTR = 'EI_ACTION_TAG';
    var ACTION_TAG = 'EI_ACTION';
    function createFactory(type, factory) {
        function ActionCreator(payload) {
            var action = u.isFunction(factory) ? factory.apply(null, arguments) : {};
            action.type = type;
            return action;
        }
        ActionCreator[ACTION_ATTR] = ACTION_TAG;
        ActionCreator.type = type;
        return ActionCreator;
    }
    exports.extend = function (type, factory) {
        if (!u.isString(type)) {
            throw new Error('Action Creator must have a type');
        }
        return createFactory(type, factory);
    };
    exports.is = function (action) {
        return action && action[ACTION_ATTR] === ACTION_TAG;
    };
});