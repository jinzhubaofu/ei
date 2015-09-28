define('ei/util/composeReducer', [
    'exports',
    '../babelHelpers',
    'underscore'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var u = require('underscore');
    function composeReducer(reducers) {
        if (u.isFunction(reducers)) {
            return reducers;
        }
        reducers = u.reduce(u.toArray(arguments), function (finalReducer, reducer) {
            return u.extendOwn(finalReducer, reducer);
        }, {});
        return function (state, action) {
            var nextState = u.clone(state);
            var isChanged = false;
            for (var name in reducers) {
                var value = state[name];
                var nextValue = nextState[name] = reducers[name](value, action);
                if (nextValue !== value) {
                    isChanged = true;
                }
            }
            return isChanged ? nextState : state;
        };
    }
    module.exports = composeReducer;
});