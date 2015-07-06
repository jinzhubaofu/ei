/**
 * @file Action
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var u = require('underscore');
var debug = require('debug')('Action');

var actionGuidIndex = 0;

var ACTION_HANDLER_GUID_ATTR_NAME = 'ACTION_HANDLER_GUID';
var ACTION_HANDLER_GUID_PREFIX = 'A-';

function nextGuid() {
    return ACTION_HANDLER_GUID_PREFIX + (++actionGuidIndex);
}

function Action(options) {
    u.extend(this, options);
}

Action.prototype.getId = function () {
    var id = this[ACTION_HANDLER_GUID_ATTR_NAME];
    if (!id) {
        id = this[ACTION_HANDLER_GUID_ATTR_NAME] = nextGuid();
        debug('Action get new id: %s', id);
    }
    return id;
};

Action.prototype.execute = function (dispatcher, payload) {
    dispatcher.dispatch(this, payload);
};

exports.create = function (options) {
    return new Action(options);
};

