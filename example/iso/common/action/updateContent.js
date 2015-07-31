/**
 * @file action toggle
 * @author Leon(leon@outlook.com)
 */

var Resource = require('../../../../../lib/resource');

module.exports = function (id, content) {

    return function (dispatch, getState) {

        var todo = Resource.get('todo');

        dispatch({
            type: 'TODO_CONTENT_UPDATE_START',
            id: id
        });

        todo
            .updateContent(id, content)
            .then(function (data) {

                dispatch({
                    type: 'TODO_CONTENT_UPDATE_SUCCEED',
                    todo: data
                });

            }, function () {

                dispatch({
                    type: 'TODO_CONTENT_UPDATE_FAILED',
                    id: id
                });

            });

    };

};
