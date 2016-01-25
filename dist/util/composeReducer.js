define('ei/util/composeReducer', [
    'require',
    'exports',
    'module',
    '../babelHelpers'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    function composeReducer(mainReducer) {
        if (typeof mainReducer === 'function') {
            return mainReducer;
        }
        for (var _len = arguments.length, restReducers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            restReducers[_key - 1] = arguments[_key];
        }
        var reducers = restReducers.reduce(function (finalReducer, reducer) {
            return babelHelpers._extends({}, finalReducer, reducers);
        }, mainReducer);
        return function (state, action) {
            var nextState = babelHelpers._extends({}, state);
            var isChanged = false;
            for (var _name in reducers) {
                if (reducers.hasOwnProperty(_name)) {
                    var value = state[_name];
                    var nextValue = nextState[_name] = reducers[_name](value, action);
                    if (nextValue !== value) {
                        isChanged = true;
                    }
                }
            }
            return isChanged ? nextState : state;
        };
    }
    module.exports = composeReducer;
});