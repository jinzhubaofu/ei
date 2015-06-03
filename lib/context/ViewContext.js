/**
 * @file ViewContext
 * @author Leon(leon@outlook.com)
 */

/*eslint-env node*/

var u = require('underscore');

function getStore(context, Store) {
    return context.getStore(Store);
}

function ViewContext(context) {
    this.getStore = u.partial(getStore, context);
}

module.exports = ViewContext;

