define('ei/util/bindActions', [
    'require',
    'exports',
    'module',
    'underscore',
    './invariant'
], function (require, exports, module) {
    var u = require('underscore');
    var invariant = require('./invariant');
    function bindActions(dispatch, actions) {
        invariant(actions, 'need action config');
        invariant(dispatch, 'need dispatch');
        return u.mapObject(actions, function (creator, methodName) {
            return function () {
                var action = creator.apply(null, arguments);
                invariant(action, 'action creator must return a object/funciton');
                return dispatch(action);
            };
        });
    }
    module.exports = bindActions;
});