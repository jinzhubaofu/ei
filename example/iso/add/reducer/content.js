/**
 * @file content reducer
 * @author Leon(leon@outlook.com)
 */

exports.content = function (content, action) {


    switch (action.type) {
        case 'ADD_UPDATE_CONTENT':
            return action.content;
        default:
            return content;
    }


};
