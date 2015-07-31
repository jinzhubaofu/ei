/**
 * @file action toggle
 * @author Leon(leon@outlook.com)
 */

var Resource = require('../../../../../lib/resource');

module.exports = function (id, isFinished) {

    return function (dispatch, getState) {

        var todo = Resource.get('todo');

        dispatch({
            type: 'TODO_TOGGLE_START',
            id: id
        });

        todo
            .setFinished(id, isFinished)
            .then(function (data) {

                dispatch({
                    type: 'TODO_TOGGLE_SUCCEED',
                    id: id,
                    isFinished: isFinished
                });

            }, function () {

                dispatch({
                    type: 'TODO_TOGGLE_FAILED',
                    id: id
                });

            });

    };

};
