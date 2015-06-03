/**
 * @file Action
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var actions = {};

function register(name, ActionClass) {
    if (actions[name]) {
        throw new Error('action ' + name + ' already exist');
    }
    actions[name] = ActionClass;
}


exports.createClass = function (proto) {

    if (!proto || !proto.name) {
        throw new Error('Action Class need a name');
    }


    function Action(context) {
        this.context = context;
    }

    register(proto.name, Action);

    Action.create = function (context) {
        return new Action(context);
    };

    return Action;
};

exports.getClass = function (name) {
    return actions[name];
};
