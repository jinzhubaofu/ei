/**
 * @file todo reducer
 * @author Leon(leon@outlook.com)
 */

var Immutable = require('immutable');

exports.todo = function (todo, action) {

    var nextState;

    switch (action.type) {

        case 'init':

            nextState = Immutable.fromJS(action.data);

            break;

        case 'TODO_TOGGLE_START':

            nextState = todo.set('isHandlingToggle', true);

            break;

        case 'TODO_TOGGLE_SUCCEED':
        case 'TODO_TOGGLE_FAILED':

            nextState = todo.merge({
                isFinished: action.isFinished,
                isHandlingToggle: false
            });

            break;

        case 'TODO_CHANGE_CONTENT':

            nextState = todo.set('content', action.content);
            break;


        case 'TODO_CONTENT_UPDATE_START':

            nextState = todo.set('isUpdating', true);

            break;

        case 'TODO_CONTENT_UPDATE_SUCCEED':
        case 'TODO_CONTENT_UPDATE_FAILED':

            nextState = Immutable.fromJS(action.todo);

            break;

        default:
            nextState = todo;
            break;
    }

    console.log(nextState.toJSON());

    return nextState;

};
