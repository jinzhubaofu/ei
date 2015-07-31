/**
 * @file 合成reducer
 * @author Leon(leon@outlook.com)
 * @requires underscore
 */

var u = require('underscore');

/**
 * 合成reducer
 *
 * @public
 * @method module:ei.composeReducer
 * @param {...(Function | Object)} reducers 一个reducer，或多个reducer的map
 * @return {Function}
 */
function composeReducer(reducers) {

    if (u.isFunction(reducers)) {
        return reducers;
    }

    reducers = u.reduce(
        u.toArray(arguments),
        function (finalReducer, reducer) {
            return u.extend(finalReducer, reducer);
        },
        {}
    );

    return function (state, action) {

        var isChanged = false;
        var nextState = {};

        for (var name in reducers) {

            if (u.has(reducers, name)) {

                var value = state[name];
                var nextValue = nextState[name] = reducers[name](value, action);

                if (nextValue !== value) {
                    isChanged = true;
                }

            }

        }

        return isChanged ? nextState : state;

    };

}

module.exports = composeReducer;
