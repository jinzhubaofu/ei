/**
 * @file bindActions
 * @author Leon(leon@outlook.com)
 */

var u = require('underscore');

var invariant = require('./invariant');

/**
 * 将一堆action creator绑定到一个`dispatch`方法上
 *
 * @private
 * @param  {!Function} dispatch dispatch方法
 * @param  {!Object}   actions  一个action creator的map
 * @return {Object}
 */
function bindActions(dispatch, actions) {

    invariant(actions, 'need action config');
    invariant(dispatch, 'need dispatch');

    return u.mapObject(
        actions,
        function (creator, methodName) {

            return function () {

                var action = creator.apply(null, arguments);

                invariant(action, 'action creator must return a object/funciton');

                return dispatch(action);
            };

        }
    );

}

module.exports = bindActions;
