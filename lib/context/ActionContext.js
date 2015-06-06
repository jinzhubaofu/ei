/**
 * @file ActionContext
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

function ActionContext(context) {
    this.context = context;
}

ActionContext.prototype.dispatch = function (action, payload) {
    this.context.dispatch(action, payload);
};

module.exports = ActionContext;

