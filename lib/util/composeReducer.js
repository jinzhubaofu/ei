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

        var nextState = u.reduce(
            reducers,
            function (result, reducer, name) {
                result[name] = reducer(state[name], action);
                return result;
            },
            {}
        );

        return nextState;

    };

}

module.exports = composeReducer;
