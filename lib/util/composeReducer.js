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
            return u.extendOwn(finalReducer, reducer);
        },
        {}
    );

    return function (state, action) {

        // 针对 reducer 中指定的属性进行修改，而那些未指定的属性直接拷贝一份即可
        // 所以，这里我们先把状态浅拷贝一份
        var nextState = u.clone(state);
        var isChanged = false;

        for (var name in reducers) {

            if (reducers.hasOwnProperty(name)) {

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
