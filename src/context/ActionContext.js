define(require, exports, module) {
/**
 * @file ActionContext
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

function ActionContext(context) {
    this.context = context;
}

ActionContext.prototype.dispatch = function (actionName, payload) {
    this.context.dispatch(actionName, payload);
};

module.exports = ActionContext;


});