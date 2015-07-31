/**
 * @file list reducer
 * @author Leon(leon@outlook.com)
 */

var Immutable = require('immutable');

function sort(a, b) {
    var aIsFinished = a.get('isFinished');
    var bIsFinished = b.get('isFinished');

    if (aIsFinished !== bIsFinished) {
        return aIsFinished - bIsFinished;
    }

    return b.get('updateTime') - a.get('updateTime');
}

exports.list = function (list, action) {

    switch (action.type) {
        case 'bootstrap':
            return Immutable
                .fromJS(action.data)
                .sort(sort);

        case 'TODO_TOGGLE_SUCCEED':

            return list
                .map(function (record) {

                    return record.get('id') === action.id
                        ? record.set('isFinished', action.isFinished)
                        : record;

                })
                .sort(sort);

        default:
            return list;
    }

};
