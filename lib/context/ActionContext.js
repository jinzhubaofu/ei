/**
 * @file ActionContext
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

function ActionContext(context) {
    this.context = context;
}

ActionContext.prototype.get = function () {
    var context = this.context;
    return context.get.apply(context, arguments);
};

ActionContext.prototype.set = function () {
    var context = this.context;
    return context.set.apply(context, arguments);
};

ActionContext.prototype.dispatch = function (actionName, payload) {
    this.context.dispatch(actionName, payload);
};

module.exports = ActionContext;

