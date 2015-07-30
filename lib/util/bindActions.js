/**
 * @file bindActions
 * @author Leon(leon@outlook.com)
 */

var u = require('underscore');

/**
 * 将一堆action creator绑定到一个`dispatch`方法上
 *
 * @private
 * @method module:ei.bindActions
 * @param  {!Function} dispatch dispatch方法
 * @param  {!Object}   actions  一个action creator的map
 * @return {Object}
 */
function bindActions(dispatch, actions) {

    return u.mapObject(
        actions,
        function (creator, methodName) {

            return function () {
                return dispatch(creator.apply(null, arguments));
            };

        }
    );

}

module.exports = bindActions;
