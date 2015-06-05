define(require, exports, module) {
/**
 * @file ViewContext
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var u = require('underscore');

function ViewContext(context) {
    this.getStore = u.bind(context.getStore, context);
    this.executeAction = u.bind(context.executeAction, context);
}

module.exports = ViewContext;


});