/**
 * @file bindActions
 * @author Leon(leon@outlook.com)
 */

var invariant = require('./invariant');

/**
 * 将一堆action creator绑定到一个`dispatch`方法上
 *
 * @private
 * @param  {!Function} dispatch dispatch方法
 * @param  {?Object}   actions  一个action creator的map
 * @return {Object}
 */
function bindActions(dispatch, actions = {}) {

    invariant(typeof dispatch === 'function', 'need dispatch');

    function execute(methodName, ...args) {
        var action = actions[methodName](...args);
        invariant(action, 'action creator must return a object/funciton');
        return dispatch(action);
    }

    return Object
        .keys(actions)
        .reduce(
            function (result, methodName) {
                result[methodName] = execute.bind(null, methodName);
                return result;
            },
            {}
        );
}

module.exports = bindActions;
