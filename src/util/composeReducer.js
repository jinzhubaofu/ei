/**
 * @file 合成reducer
 * @author Leon(leon@outlook.com)
 */

/**
 * 合成reducer
 *
 * @public
 * @method module:ei.composeReducer
 * @param {(Function | Object)} mainReducer 一个reducer，或多个reducer的map
 * @param {...(Function | Object)} restReducers 辅助 reducers
 *
 * @return {Function}
 */
function composeReducer(mainReducer, ...restReducers) {

    if (typeof mainReducer === 'function') {
        return mainReducer;
    }

    const reducers = restReducers
        .reduce(
            function (finalReducer, reducer) {
                return {
                    ...finalReducer,
                    ...reducers
                };
            },
            mainReducer
        );

    return function (state, action) {

        // 针对 reducer 中指定的属性进行修改，而那些未指定的属性直接拷贝一份即可
        // 所以，这里我们先把状态浅拷贝一份
        const nextState = {...state};
        let isChanged = false;

        /* eslint-disable fecs-use-for-of */
        for (let name in reducers) {

            if (reducers.hasOwnProperty(name)) {

                const value = state[name];
                const nextValue = nextState[name] = reducers[name](value, action);

                if (nextValue !== value) {
                    isChanged = true;
                }

            }

        }
        /* eslint-enable fecs-use-for-of */

        return isChanged ? nextState : state;

    };

}

module.exports = composeReducer;
